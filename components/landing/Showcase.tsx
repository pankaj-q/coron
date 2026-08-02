"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const demoSteps = [
  {
    time: "Today · 09:00",
    title: "Validate the idea with 20 users",
    how: "Post a landing page, run 20 interviews, note objections.",
    duration: 90,
    priority: "high",
  },
  {
    time: "Today · 13:00",
    title: "Map the core feature set",
    how: "Keep only the 3 features users asked for the most.",
    duration: 45,
    priority: "high",
  },
  {
    time: "Tomorrow · 09:00",
    title: "Build the MVP skeleton",
    how: "Auth → dashboard → the one killer flow. Ship ugly.",
    duration: 180,
    priority: "medium",
  },
  {
    time: "Tomorrow · 18:00",
    title: "Launch + collect first feedback",
    how: "Post to 3 communities, watch analytics, fix what breaks.",
    duration: 60,
    priority: "low",
  },
];

const priorityStyles: Record<string, { badge: string; dot: string; text: string }> = {
  high: { badge: "bg-rose-500/15 text-rose-300 ring-rose-400/30", dot: "bg-rose-400", text: "High" },
  medium: { badge: "bg-amber-500/15 text-amber-300 ring-amber-400/30", dot: "bg-amber-400", text: "Medium" },
  low: { badge: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30", dot: "bg-emerald-400", text: "Low" },
};

function ProgressRing() {
  return (
    <div className="relative h-24 w-24">
      <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="url(#showcaseGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 42}
          initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
          whileInView={{ strokeDashoffset: 2 * Math.PI * 42 * 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.4, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="showcaseGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
        className="absolute inset-0 grid place-items-center"
      >
        <span className="font-display text-2xl font-bold text-white">50%</span>
      </motion.div>
    </div>
  );
}

export function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="showcase" ref={ref} className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">Showcase</p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              One glance. You instantly know <span className="text-gradient">what&apos;s next</span>.
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-slate-400">
              No walls of text. PlanPilot renders your plan as a living timeline —
              priorities glow, timings are pinned, and progress flows. You feel the
              order before you even read a word.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                ["Pulse glow on the next critical step", "text-rose-400"],
                ["Clock chips pin every action to a time slot", "text-cyan-400"],
                ["Confetti + fill animation every time you check off", "text-emerald-400"],
              ].map(([text, color], i) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.12 }}
                  className="flex items-center gap-3 text-slate-200"
                >
                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/5 ${color}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm sm:text-base">{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-cyan-500/20 blur-2xl" />

            <div className="glass-strong glow-border relative rounded-3xl p-6 shadow-2xl shadow-black/40">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <span className="ml-3 font-display text-sm font-semibold text-white">
                    Launch my SaaS in 6 weeks
                  </span>
                </div>
                <ProgressRing />
              </div>

              <div className="mb-4 flex items-center gap-3 rounded-2xl border border-violet-400/25 bg-violet-500/10 p-4">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-violet-400" />
                </span>
                <p className="text-xs leading-relaxed text-violet-100 sm:text-sm">
                  <span className="font-semibold">Focus first:</span> validate with real users —
                  everything else depends on it.
                </p>
              </div>

              <div className="relative space-y-4 pl-8">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-rose-400/80 via-amber-400/60 to-emerald-400/40" />
                {demoSteps.map((s, i) => {
                  const p = priorityStyles[s.priority];
                  return (
                    <motion.div
                      key={s.title}
                      initial={{ opacity: 0, x: 24 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.35 + i * 0.22 }}
                      className="relative"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        transition={{ delay: 0.35 + i * 0.22, type: "spring", stiffness: 260 }}
                        className={`absolute -left-8 top-4 grid h-[15px] w-[15px] place-items-center rounded-full ${p.dot} shadow-[0_0_14px_2px] shadow-current ring-4 ring-[#12152e]`}
                      />
                      <div className="glass rounded-2xl px-4 py-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-display text-sm font-semibold text-white">{s.title}</span>
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ${p.badge}`}>
                            {p.text}
                          </span>
                        </div>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                          <span className="inline-flex items-center gap-1.5">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-cyan-400">
                              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" />
                            </svg>
                            {s.time}
                          </span>
                          <span>{s.how}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
