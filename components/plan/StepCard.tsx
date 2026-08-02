"use client";

import { motion } from "framer-motion";
import type { PlanStepDto } from "@/lib/types";

const priorityConfig: Record<
  string,
  { label: string; badge: string; node: string; glow: string; chip: string }
> = {
  high: {
    label: "High",
    badge: "bg-rose-500/15 text-rose-300 ring-rose-400/30",
    node: "bg-rose-400",
    glow: "shadow-[0_0_16px_2px] shadow-rose-500/60",
    chip: "text-rose-400",
  },
  medium: {
    label: "Medium",
    badge: "bg-amber-500/15 text-amber-300 ring-amber-400/30",
    node: "bg-amber-400",
    glow: "shadow-[0_0_16px_2px] shadow-amber-500/60",
    chip: "text-amber-400",
  },
  low: {
    label: "Low",
    badge: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30",
    node: "bg-emerald-400",
    glow: "shadow-[0_0_16px_2px] shadow-emerald-500/60",
    chip: "text-emerald-400",
  },
};

export function StepCard({
  step,
  isCurrent,
  pending,
  onToggle,
}: {
  step: PlanStepDto;
  isCurrent: boolean;
  pending: boolean;
  onToggle: (step: PlanStepDto) => void;
}) {
  const p = priorityConfig[step.priority] ?? priorityConfig.medium;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: step.stepNo * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
        step.done
          ? "glass opacity-75"
          : isCurrent
            ? "glass-strong glow-border ring-1 ring-violet-400/30"
            : "glass hover:bg-white/[0.07]"
      }`}
    >
      <div
        className={`absolute left-0 top-0 h-full w-1 transition-colors ${
          step.done ? "bg-emerald-400/80" : p.node
        }`}
      />

      <div className="flex items-start gap-4 p-5">
        <button
          onClick={() => onToggle(step)}
          disabled={pending}
          aria-label={step.done ? "Mark as not done" : "Mark as done"}
          className={`relative mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 active:scale-90 ${
            step.done
              ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-[#04231a] shadow-lg shadow-emerald-500/40"
              : `bg-white/5 ring-2 ${isCurrent ? `${p.node} ${p.glow}` : "ring-white/20"} hover:bg-white/10`
          }`}
        >
          {pending && (
            <svg className="absolute h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          )}
          {!pending &&
            (step.done ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <span className="font-display text-sm font-bold text-white">{step.stepNo}</span>
            ))}
          {isCurrent && !step.done && (
            <span className="absolute inset-0 animate-pulse-ring rounded-full ring-2 ring-violet-400/50" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`font-display text-base font-bold leading-snug ${
                step.done ? "text-slate-400 line-through" : "text-white"
              }`}
            >
              {step.title}
            </h3>
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ${p.badge}`}>
              {p.label}
            </span>
            {isCurrent && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-300 ring-1 ring-violet-400/30">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-violet-300" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-violet-300" />
                </span>
                Up next
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
            {step.when && (
              <span className="inline-flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-cyan-400">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" />
                </svg>
                {step.when}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-fuchsia-400">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" />
              </svg>
              ~{step.duration} min
            </span>
          </div>

          {step.how && (
            <p
              className={`mt-2.5 border-l-2 pl-3 text-sm leading-relaxed ${
                step.done ? "border-white/10 text-slate-500" : "border-white/10 text-slate-300"
              }`}
            >
              {step.how}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
