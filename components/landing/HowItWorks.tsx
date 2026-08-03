"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Tell it your goal",
    desc: "Type any task — big or small — and add a deadline. “Prepare for my interview this Friday”, “Build my portfolio in a month”.",
  },
  {
    num: "02",
    title: "AI builds the plan",
    desc: "Gemini returns a prioritized, timed, step-by-step plan: what to do, when to do it, how long it takes, and how.",
  },
  {
    num: "03",
    title: "Just follow the flow",
    desc: "Steps glow by priority. Check them off and watch your progress ring fill — the plan guides you to done.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative border-t border-white/5 py-24 sm:py-28">
      <div className="mx-auto max-w-[96rem] px-5 sm:px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">{"// how it works"}</p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Three moves.
            <br />
            <span className="text-stroke">Zero stress.</span>
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-[#070810] p-8 transition-colors hover:bg-[#0a0c16] sm:p-10"
            >
              <span className="font-mono text-sm text-slate-600 transition-colors group-hover:text-emerald-400">
                {s.num}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-400">{s.desc}</p>
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
