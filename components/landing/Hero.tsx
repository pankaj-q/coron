"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { TerminalDemo } from "@/components/landing/TerminalDemo";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44">
      <div className="mx-auto grid max-w-[96rem] items-center gap-16 px-5 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              AI smart planner · Free forever
            </span>
          </motion.div>

          <motion.div variants={item} className="mt-8 font-mono text-sm text-slate-600">
            {"[/\\-_=+|< -/= ~:*-/]"}
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-4 font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            Type a goal.
            <br />
            Get the plan.
            <br />
            <span className="text-stroke">Start doing.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-xl text-lg leading-relaxed text-slate-400">
            Tell Coron what you want to achieve — today, this week, or this year. It instantly
            builds a <span className="font-semibold text-white">prioritized, perfectly-timed plan</span>:
            what to do, when, and how. No blank pages. No guessing.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/signup"
              className="rounded-xl bg-white px-7 py-3.5 text-base font-bold text-black transition-all hover:bg-neutral-200 active:scale-[0.97]"
            >
              Create my first plan
            </Link>
            <a
              href="#how"
              className="group flex items-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/5"
            >
              See how it works
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          <motion.p variants={item} className="mt-8 font-mono text-sm text-slate-600">
            {"// free forever · no credit card · your plans stay yours"}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative"
        >
          <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-br from-violet-600/10 to-cyan-500/10 blur-2xl" />
          <div className="relative -rotate-1 transition-transform duration-500 hover:rotate-0">
            <TerminalDemo />
          </div>
          <p className="mt-4 text-center font-mono text-xs text-slate-600">
            what you type &rarr; what Gemini builds &rarr; what you follow
          </p>
        </motion.div>
      </div>
    </section>
  );
}
