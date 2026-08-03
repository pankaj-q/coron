"use client";

import { motion } from "framer-motion";

function SectionHeader() {
  return (
    <div className="mb-16 max-w-2xl">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">{"// features"}</p>
      <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Built for people
        <br />
        <span className="text-stroke">who finish.</span>
      </h2>
    </div>
  );
}

function MockFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#070810] shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-slate-600">coron.app</span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

const features = [
  {
    num: "01",
    title: "Plan",
    headline: "From one sentence to a full schedule",
    desc: "Type your goal the way you'd say it out loud. Coron turns it into a structured, step-by-step plan with clear how-to guidance — no prompt engineering required.",
    mock: (
      <div className="space-y-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
          “Launch my portfolio in 30 days”
        </div>
        <div className="space-y-2 pt-1">
          {[
            { t: "Define your positioning", m: "today · 18:00", p: "HIGH" },
            { t: "Build the core sections", m: "tomorrow · 09:00", p: "HIGH" },
            { t: "Write case studies", m: "this week", p: "MED" },
          ].map((s) => (
            <div key={s.t} className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5">
              <span className="h-3.5 w-3.5 rounded border border-white/20" />
              <span className="flex-1 text-sm text-white">{s.t}</span>
              <span className="font-mono text-[10px] text-slate-500">{s.m}</span>
              <span className="rounded bg-rose-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-rose-300">{s.p}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: "02",
    title: "Prioritize",
    headline: "High, medium, low — decided for you",
    desc: "Every step gets a priority so you always know what moves the needle. No more choosing between a hundred tasks.",
    mock: (
      <div className="space-y-4">
        <div className="space-y-2">
          {[
            { label: "HIGH", count: "3 steps", cls: "text-rose-300 bg-rose-500/15 ring-rose-400/20", dot: "bg-rose-400" },
            { label: "MEDIUM", count: "2 steps", cls: "text-amber-300 bg-amber-500/15 ring-amber-400/20", dot: "bg-amber-400" },
            { label: "LOW", count: "1 step", cls: "text-emerald-300 bg-emerald-500/15 ring-emerald-400/20", dot: "bg-emerald-400" },
          ].map((p) => (
            <div key={p.label} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <span className="flex items-center gap-2.5">
                <span className={`h-2 w-2 rounded-full ${p.dot}`} />
                <span className={`rounded px-2 py-0.5 font-mono text-xs font-bold ring-1 ${p.cls}`}>{p.label}</span>
              </span>
              <span className="font-mono text-xs text-slate-500">{p.count}</span>
            </div>
          ))}
        </div>
        <div className="flex h-2 overflow-hidden rounded-full bg-white/5">
          <span className="w-1/2 bg-rose-400" />
          <span className="w-1/3 bg-amber-400" />
          <span className="flex-1 bg-emerald-400" />
        </div>
      </div>
    ),
  },
  {
    num: "03",
    title: "Schedule",
    headline: "Time windows that respect your pace",
    desc: "Plans arrive with realistic slots and durations — spread across your day and week so momentum is easy and burnout is not an option.",
    mock: (
      <div className="space-y-1.5">
        {[
          { day: "Mon", cells: [0, 1, 1, 0, 0] },
          { day: "Tue", cells: [1, 1, 1, 1, 0] },
          { day: "Wed", cells: [0, 0, 1, 1, 0] },
          { day: "Thu", cells: [1, 1, 0, 0, 0] },
          { day: "Fri", cells: [0, 1, 1, 1, 1] },
        ].map((row) => (
          <div key={row.day} className="flex items-center gap-3">
            <span className="w-9 font-mono text-xs text-slate-500">{row.day}</span>
            <div className="flex flex-1 gap-1.5">
              {row.cells.map((c, i) => (
                <span
                  key={i}
                  className={`h-6 flex-1 rounded-md ${c ? "bg-gradient-to-br from-violet-500/70 to-cyan-500/60" : "bg-white/[0.04]"}`}
                />
              ))}
            </div>
          </div>
        ))}
        <p className="pt-2 font-mono text-[10px] text-slate-600">focused work slots · 09–18</p>
      </div>
    ),
  },
  {
    num: "04",
    title: "Track",
    headline: "Check off steps. Watch it fill.",
    desc: "Mark steps done as you go — confetti, a living progress ring, and a clear view of what's next. Momentum you can see.",
    mock: (
      <div className="flex items-center gap-6">
        <div className="relative h-28 w-28 shrink-0">
          <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="url(#featRing)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="263.9"
              strokeDashoffset="88"
            />
            <defs>
              <linearGradient id="featRing" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display text-2xl font-bold text-white">67%</span>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          {[
            { t: "Define positioning", done: true },
            { t: "Build core sections", done: true },
            { t: "Write case studies", done: true },
            { t: "Collect testimonials", done: false },
            { t: "Launch & announce", done: false },
          ].map((s) => (
            <div key={s.t} className="flex items-center gap-2.5 text-sm">
              <span className={`grid h-4 w-4 place-items-center rounded ${s.done ? "bg-emerald-500" : "border border-white/20"}`}>
                {s.done && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="h-2.5 w-2.5">
                    <path d="M5 12l5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className={s.done ? "text-slate-500 line-through" : "text-white"}>{s.t}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: "05",
    title: "Remember",
    headline: "Your plans, saved per user",
    desc: "Every plan lives in your own account. Come back later, pick up right where you left off — nothing lost between sessions.",
    mock: (
      <div className="space-y-2.5">
        {[
          { t: "Launch my portfolio", s: "3/6 done", pct: "w-1/2 bg-emerald-400" },
          { t: "Data-science interview", s: "2/6 done", pct: "w-1/3 bg-violet-400" },
          { t: "Learn React deeply", s: "5/5 done", pct: "w-full bg-cyan-400" },
        ].map((p) => (
          <div key={p.t} className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">{p.t}</span>
              <span className="font-mono text-[10px] text-slate-500">{p.s}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
              <div className={`h-full ${p.pct}`} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "06",
    title: "Privacy",
    headline: "Your data stays yours",
    desc: "Plans are stored locally in your own SQLite database. No tracking, no selling data — just your goals, safely yours.",
    mock: (
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.03]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7 text-emerald-400">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 018 0v3M12 15v2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-mono text-sm text-white">SQLite · local</p>
          <p className="mt-1 text-xs text-slate-500">
            Per-user storage, hashed passwords, signed sessions, rate-limited APIs.
          </p>
        </div>
      </div>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="relative border-t border-white/5 py-24 sm:py-28">
      <div className="mx-auto max-w-[96rem] px-5 sm:px-6">
        <SectionHeader />

        <div className="space-y-20 sm:space-y-28">
          {features.map((f, i) => (
            <motion.div
              key={f.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <span className="font-mono text-sm text-slate-600">
                  {"#" + f.num}
                </span>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">{f.title}</p>
                <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {f.headline}
                </h3>
                <p className="mt-4 max-w-lg leading-relaxed text-slate-400">{f.desc}</p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={i % 2 === 1 ? "lg:order-1" : ""}
              >
                <MockFrame>{f.mock}</MockFrame>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
