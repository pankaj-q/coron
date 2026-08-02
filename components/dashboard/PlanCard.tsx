"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PlanDto } from "@/lib/types";

function MiniRing({ percent }: { percent: number }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - percent / 100);
  return (
    <div className="relative h-14 w-14 shrink-0">
      <svg viewBox="0 0 52 52" className="h-14 w-14 -rotate-90">
        <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
        <motion.circle
          cx="26"
          cy="26"
          r={r}
          fill="none"
          stroke="url(#miniGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <defs>
          <linearGradient id="miniGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[11px] font-bold text-white">
        {percent}%
      </span>
    </div>
  );
}

function priorityCount(steps: PlanDto["steps"]) {
  return {
    high: steps.filter((s) => s.priority === "high").length,
    medium: steps.filter((s) => s.priority === "medium").length,
    low: steps.filter((s) => s.priority === "low").length,
  };
}

export function PlanCard({ plan, index }: { plan: PlanDto; index: number }) {
  const done = plan.steps.filter((s) => s.done).length;
  const percent = plan.steps.length ? Math.round((done / plan.steps.length) * 100) : 0;
  const p = priorityCount(plan.steps);

  const created = new Date(plan.createdAt);
  const dateLabel = created.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.5) }}
    >
      <Link
        href={`/dashboard/plans/${plan.id}`}
        className="group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.05]"
      >
        <div className={`h-1 w-full bg-gradient-to-r ${percent === 100 ? "from-emerald-500 to-teal-400" : "from-violet-500 to-cyan-400"}`} />
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <span>{dateLabel}</span>
                {plan.deadline && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-rose-300 ring-1 ring-rose-400/20">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" />
                    </svg>
                    {plan.deadline}
                  </span>
                )}
              </div>
              <h3 className="line-clamp-2 font-display text-lg font-bold leading-snug text-white">
                {plan.title}
              </h3>
            </div>
            <MiniRing percent={percent} />
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-xs text-slate-400">
              {done}/{plan.steps.length} steps
            </span>
            <span className="text-slate-700">·</span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-cyan-400">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" />
              </svg>
              ~{plan.totalMinutes ? `${Math.round(plan.totalMinutes / 60)}h` : "—"}
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              {(["high", "medium", "low"] as const).map((k) =>
                p[k] > 0 ? (
                  <span key={k} className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        k === "high" ? "bg-rose-400" : k === "medium" ? "bg-amber-400" : "bg-emerald-400"
                      }`}
                    />
                    {p[k]}
                  </span>
                ) : null,
              )}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-sm font-semibold text-cyan-300 transition-colors group-hover:text-cyan-200">
              Open plan
            </span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-white">
              <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
