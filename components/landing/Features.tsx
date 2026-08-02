"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1m0-12.8l-2.1 2.1m-8.6 8.6l-2.1 2.1",
    title: "Smart prioritization",
    desc: "Gemini scores every step by urgency, impact and dependency — the critical work glows first, so you always know what matters most.",
    accent: "text-rose-400",
    glow: "from-rose-500/40",
  },
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Perfect timing",
    desc: "Every step lands in a time slot that fits your deadline and energy — morning deep-work, lunch breaks, evening wrap-ups.",
    accent: "text-cyan-400",
    glow: "from-cyan-500/40",
  },
  {
    icon: "M9 12l2 2 4-4m5.6 2.6a9 9 0 11-9.6-8.4 9 9 0 019.6 8.4z",
    title: "How-to, not just what",
    desc: "Each step comes with concrete execution instructions — the tools, techniques and sub-actions to actually get it done.",
    accent: "text-emerald-400",
    glow: "from-emerald-500/40",
  },
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Progress you can feel",
    desc: "Animated rings and a self-drawing timeline make your momentum visible. Checking off steps fires a celebration.",
    accent: "text-violet-400",
    glow: "from-violet-500/40",
  },
  {
    icon: "M12 15v2m0 4a9 9 0 110-18 9 9 0 010 18zm0-9h.01",
    title: "Private to you",
    desc: "Every plan is stored under your own account — nobody else sees your goals, deadlines or progress.",
    accent: "text-amber-400",
    glow: "from-amber-500/40",
  },
  {
    icon: "M12 15a3 3 0 100-6 3 3 0 000 6zm7-3a7 7 0 11-14 0 7 7 0 0114 0z",
    title: "Fast & protected",
    desc: "Built with rate limiting, hashed passwords and secure sessions, so your data stays yours and the app stays snappy.",
    accent: "text-fuchsia-400",
    glow: "from-fuchsia-500/40",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto max-w-[96rem] px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-fuchsia-400">Features</p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Everything you need to <span className="text-gradient">win your day</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.12 }}
              className="group relative overflow-hidden rounded-3xl glass p-7 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]"
            >
              <div className={`pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gradient-to-br ${f.glow} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`} />

              <div className="relative mb-5 inline-grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`h-6 w-6 ${f.accent}`}>
                  <path d={f.icon} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h3 className="relative font-display text-lg font-bold text-white">{f.title}</h3>
              <p className="relative mt-2.5 text-sm leading-relaxed text-slate-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
