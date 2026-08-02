import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/dal";
import { generatePlan, PlanQuotaError } from "@/lib/gemini";
import { serializePlan } from "@/lib/serialize";
import { rateLimit } from "@/lib/rate-limit";

const createSchema = z.object({
  task: z.string().min(3).max(2000),
  deadline: z.string().max(200).optional(),
});

export const maxDuration = 60;

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const plans = await prisma.plan.findMany({
    where: { userId: session.userId },
    include: { steps: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ plans: plans.map(serializePlan) });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rl = rateLimit(`plan:${session.userId}`, 6, 300_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Plan generation limit reached. Please wait a few minutes." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
        },
      },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please describe your task." }, { status: 400 });
  }

  const { task, deadline } = parsed.data;

  let generated;
  try {
    generated = await generatePlan(task, deadline);
  } catch (err) {
    if (err instanceof PlanQuotaError) {
      return NextResponse.json(
        {
          error: `Gemini's free quota is busy right now. Please wait ${err.retryAfterSec} seconds and try again.`,
          retryAfter: err.retryAfterSec,
        },
        {
          status: 429,
          headers: { "Retry-After": String(err.retryAfterSec) },
        },
      );
    }
    const message = (err as Error).message ?? "";
    const status = message.includes("not configured") ? 503 : 502;
    return NextResponse.json(
      {
        error:
          status === 503
            ? "Plan generation isn't set up yet. The admin needs to add a Gemini API key."
            : "Gemini couldn't build this plan right now. Please try again in a minute.",
      },
      { status },
    );
  }

  const plan = await prisma.$transaction(async (tx) => {
    const created = await tx.plan.create({
      data: {
        userId: session.userId,
        title: generated.title,
        taskInput: task,
        deadline: deadline ?? null,
        summary: generated.summary || null,
        focus: generated.focus || null,
        totalMinutes: generated.totalMinutes,
        steps: {
          create: generated.steps.map((s, i) => ({
            stepNo: i + 1,
            title: s.title,
            how: s.how,
            when: s.when,
            duration: s.duration,
            priority: s.priority,
          })),
        },
      },
      include: { steps: true },
    });
    return created;
  });

  return NextResponse.json({ plan: serializePlan(plan) }, { status: 201 });
}
