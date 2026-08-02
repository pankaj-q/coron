"use client";

import { Suspense, lazy } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const Hero3D = lazy(() => import("@/components/landing/Hero3D"));

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-8">
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10">
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-slate-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Powered by Gemini AI · Plan in seconds
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Stop planning.
            <br />
            <span className="text-gradient">Start doing.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300"
          >
            Tell Coron what you want to achieve — today, this week, or this year.
            It instantly builds a <span className="font-semibold text-white">prioritized, perfectly-timed plan</span>:
            what to do, when to do it, and how — in a way you can feel at a glance.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/signup"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-[length:200%_auto] px-8 py-4 text-base font-bold text-slate-950 shadow-xl shadow-orange-500/40 transition-all hover:bg-right hover:shadow-rose-500/50 active:scale-95"
            >
              <span className="relative z-10">Create my first plan — it&apos;s free</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
            <a
              href="#showcase"
              className="group flex items-center gap-2 rounded-2xl glass px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
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

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <span className="flex -space-x-2">
                {["from-violet-400 to-indigo-500", "from-cyan-400 to-sky-500", "from-fuchsia-400 to-pink-500", "from-emerald-400 to-teal-500"].map(
                  (g, i) => (
                    <span key={i} className={`h-7 w-7 rounded-full border-2 border-[#05060f] bg-gradient-to-br ${g}`} />
                  ),
                )}
              </span>
              <span>
                <span className="font-semibold text-white">12k+</span> plans built daily
              </span>
            </div>
            <div className="hidden h-5 w-px bg-white/10 sm:block" />
            <div className="flex items-center gap-2">
              <span className="flex gap-0.5 text-amber-400">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                    <path d="M11.48 3.5a.56.56 0 0 1 1.04 0l2.13 5.11a.56.56 0 0 0 .47.35l5.52.44a.56.56 0 0 1 .32.99l-4.2 3.6a.56.56 0 0 0-.18.56l1.28 5.38a.56.56 0 0 1-.84.61l-4.72-2.88a.56.56 0 0 0-.59 0l-4.72 2.88a.56.56 0 0 1-.84-.61l1.28-5.38a.56.56 0 0 0-.18-.56l-4.2-3.6a.56.56 0 0 1 .32-.99l5.52-.44a.56.56 0 0 0 .47-.35l2.13-5.11Z" />
                  </svg>
                ))}
              </span>
              <span>4.9 rated by planners</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[26rem] sm:h-[30rem] lg:h-[34rem]"
        >
          <div className="absolute inset-0">
            <Suspense fallback={null}>
              <Hero3D />
            </Suspense>
          </div>

          <FloatingChip
            className="left-0 top-10 animate-float"
            color="border-emerald-400/40"
            label="Morning — deep focus"
            value="Priority · High"
          />
          <FloatingChip
            className="right-0 top-24 animate-float-slow [animation-delay:1s]"
            color="border-cyan-400/40"
            label="09:00 · Learn React"
            value="Step 1 of 6"
          />
          <FloatingChip
            className="bottom-14 left-4 animate-float-slow"
            color="border-fuchsia-400/40"
            label="14:00 · Build & launch"
            value="Progress 85%"
          />
          <FloatingChip
            className="bottom-24 right-6 animate-float [animation-delay:1.8s]"
            color="border-violet-400/40"
            label="20:00 · Review & wrap"
            value="Remaining · Low"
          />
        </motion.div>
      </div>

      <div className="mt-16 flex justify-center">
        <a href="#how" aria-label="Scroll down" className="flex flex-col items-center gap-2 text-slate-500 transition-colors hover:text-white">
          <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
          <span className="flex h-9 w-5 justify-center rounded-full border border-white/20 pt-1.5">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-1 rounded-full bg-white/70"
            />
          </span>
        </a>
      </div>
    </section>
  );
}

function FloatingChip({
  className,
  label,
  value,
  color,
}: {
  className?: string;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className={`absolute z-20 ${className}`}>
      <div className={`glass-strong rounded-2xl border-l-2 ${color} px-4 py-2.5 shadow-xl shadow-black/30`}>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="mt-0.5 text-xs text-slate-400">{value}</p>
      </div>
    </div>
  );
}
