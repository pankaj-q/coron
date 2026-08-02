"use client";

import { motion } from "framer-motion";

export function ProgressRing({ percent, size = 144 }: { percent: number; size?: number }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - percent / 100);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="-rotate-90" style={{ width: size, height: size }}>
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="url(#progressGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: "drop-shadow(0 0 8px rgba(139,92,246,0.6))" }}
        />
        <defs>
          <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="55%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <motion.span
            key={percent}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="block font-display text-3xl font-bold text-white"
          >
            {percent}%
          </motion.span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            complete
          </span>
        </div>
      </div>
    </div>
  );
}
