import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildPlanPrompt } from "@/lib/prompt";
import type { GeneratedPlan, Priority } from "@/lib/types";

const DEFAULT_MODELS = ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash"];

export class PlanQuotaError extends Error {
  retryAfterSec: number;

  constructor(message: string, retryAfterSec: number) {
    super(message);
    this.name = "PlanQuotaError";
    this.retryAfterSec = retryAfterSec;
  }
}

function modelCandidates() {
  const configured = process.env.GEMINI_MODEL?.trim();
  const list = configured ? [configured, ...DEFAULT_MODELS] : DEFAULT_MODELS;
  return [...new Set(list.filter(Boolean))];
}

function clampInt(value: unknown, min: number, max: number) {
  const n = Math.round(Number(value));
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

export function normalizePlan(raw: unknown): GeneratedPlan {
  const data = (raw ?? {}) as Record<string, unknown>;
  const rawSteps = Array.isArray(data.steps) ? data.steps : [];

  const steps = rawSteps
    .slice(0, 10)
    .map((s, i) => {
      const step = (s ?? {}) as Record<string, unknown>;
      const priority = String(step.priority ?? "medium").toLowerCase();
      return {
        title: String(step.title ?? step.name ?? `Step ${i + 1}`).slice(0, 120),
        how: String(step.how ?? step.description ?? step.action ?? "").slice(0, 500),
        when: String(step.when ?? step.time ?? "").slice(0, 160),
        duration: clampInt(step.duration ?? step.minutes ?? 20, 5, 600),
        priority: (["high", "medium", "low"].includes(priority)
          ? priority
          : "medium") as Priority,
      };
    })
    .filter((s) => s.title.trim().length > 0);

  return {
    title: String(data.title ?? "Your plan").slice(0, 120),
    summary: String(data.summary ?? "").slice(0, 400),
    focus: String(data.focus ?? "").slice(0, 300),
    totalMinutes: clampInt(data.totalMinutes ?? 0, 0, 60 * 24 * 7),
    steps,
  };
}

export async function generatePlan(task: string, deadline?: string): Promise<GeneratedPlan> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "YOUR_GEMINI_KEY_HERE") {
    throw new Error("Gemini API key is not configured. Add GEMINI_API_KEY to .env");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const prompt = buildPlanPrompt(task, deadline);
  let lastError: unknown;
  let quotaError: PlanQuotaError | null = null;

  for (const model of modelCandidates()) {
    try {
      const generativeModel = genAI.getGenerativeModel({
        model,
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.6,
          maxOutputTokens: 4096,
        },
      });

      const result = await generativeModel.generateContent(prompt);
      const text = result.response.text();
      const cleaned = text
        .trim()
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/```\s*$/, "");
      const parsed = JSON.parse(cleaned) as unknown;
      const plan = normalizePlan(parsed);

      if (plan.steps.length === 0) {
        throw new Error("Gemini returned an empty plan");
      }
      return plan;
    } catch (err) {
      lastError = err;
      const message = (err as Error).message ?? "";
      if (/429|quota exceeded|Too Many Requests/i.test(message)) {
        const retryMatch = message.match(/Please retry in ([\d.]+)s/i);
        quotaError ??= new PlanQuotaError(
          "Gemini's free quota is temporarily exhausted.",
          retryMatch ? Math.ceil(parseFloat(retryMatch[1])) : 60,
        );
        break;
      }
      console.warn(`[gemini] model "${model}" failed: ${message}`);
    }
  }

  if (quotaError) throw quotaError;

  throw lastError instanceof Error
    ? lastError
    : new Error("Plan generation failed. Check your Gemini API key.");
}
