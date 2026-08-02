"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    icon: "✦",
    title: "Tell it your goal",
    desc: "Type any task — big or small — and add a deadline or time window. “Prepare for my interview this Friday”, “Build my portfolio in a month”.",
    grad: "from-violet-500 to-indigo-500",
  },
  {
    icon: "◈",
    title: "AI builds the plan",
    desc: "Gemini analyzes your goal and returns a prioritized, step-by-step plan: what to do, when to do it, how long it takes, and how to execute.",
    grad: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: "✦",
    title: "Just follow the flow",
    desc: "Each step glows by priority. Check them off and watch your progress ring fill — the timeline literally guides you to the finish line.",
    grad: "from-cyan-400 to-sky-500",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="how" ref={ref} className="relative py-28">
      <div className="mx-auto max-w-[96rem] px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">How it works</p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            From chaos to clarity in <span className="text-gradient">3 moves</span>
          </h2>
          <p className="mt-4 text-slate-400">
            No more blank pages, forgotten deadlines, or “where do I even start?”.
          </p>
        </motion.div>

        <div className="relative mt-20 grid gap-10 md:grid-cols-3 md:gap-6">
          <div className="absolute left-1/2 top-8 hidden h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent md:block" />

          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative"
            >
              <div className="glass glow-border relative h-full overflow-hidden rounded-3xl p-8 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${s.grad} blur-3xl`} />
                </div>

                <div className={`relative mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${s.grad} text-2xl text-white shadow-lg`}>
                  {s.icon}
                  <span className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse-ring" />
                </div>

                <h3 className="relative font-display text-xl font-bold text-white">{s.title}</h3>
                <p className="relative mt-3 leading-relaxed text-slate-400">{s.desc}</p>

                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-violet-500/50 md:block" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
