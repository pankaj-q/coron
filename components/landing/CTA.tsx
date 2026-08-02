"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CTA() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-[96rem] px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center sm:px-16"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-700 via-indigo-700 to-cyan-600" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_45%)]" />
          <div className="absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-cyan-300/30 blur-3xl" />
          <div className="noise-overlay absolute inset-0 opacity-30" />

          <div className="relative">
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Your next goal deserves a plan.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">
              Type one sentence. Watch a perfect plan appear. Start moving today.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-4 text-base font-bold text-slate-950 shadow-xl shadow-black/20 transition-all hover:scale-[1.04] active:scale-95"
              >
                <span className="relative z-10">Start free — no card needed</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
              <Link
                href="/login"
                className="rounded-2xl border border-white/30 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                I already have an account
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
