"use client";

import { motion } from "framer-motion";

function BigRing({ percent }: { percent: number }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - percent / 100);
  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="url(#overviewGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="overviewGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-2xl font-bold text-white">{percent}%</span>
      </div>
    </div>
  );
}

export function ProgressOverview({
  doneSteps,
  totalSteps,
  completedPlans,
  totalPlans,
}: {
  doneSteps: number;
  totalSteps: number;
  completedPlans: number;
  totalPlans: number;
}) {
  const percent = totalSteps ? Math.round((doneSteps / totalSteps) * 100) : 0;
  const rows = [
    { label: "Plans finished", value: `${completedPlans}/${totalPlans}`, accent: "text-emerald-300" },
    { label: "Focus score", value: totalPlans ? "Good" : "—", accent: "text-violet-300" },
  ];

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-violet-600/15 blur-3xl" />

      <div className="relative flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-300">Overall progress</h3>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300 ring-1 ring-emerald-400/20">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Live
        </span>
      </div>

      <div className="relative mt-6 flex items-center gap-6">
        <BigRing percent={percent} />
        <div>
          <p className="font-display text-3xl font-bold text-white">
            {doneSteps}<span className="text-slate-500">/{totalSteps}</span>
          </p>
          <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">steps done</p>
        </div>
      </div>

      <div className="relative mt-6 space-y-3 border-t border-white/5 pt-5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between text-sm">
            <span className="text-slate-400">{r.label}</span>
            <span className={`font-semibold ${r.accent}`}>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
