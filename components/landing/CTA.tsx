"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CTA() {
  return (
    <section className="relative border-t border-white/5 py-28 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">{"// ready?"}</p>
          <h2 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Your next goal
            <br />
            deserves a <span className="text-stroke">plan.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
            Type one sentence. Watch a perfect plan appear. Start moving today.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-xl bg-white px-8 py-4 text-base font-bold text-black transition-all hover:bg-neutral-200 active:scale-[0.97]"
            >
              Start free — no card needed
            </Link>
            <Link
              href="/login"
              className="rounded-xl border border-white/15 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/5"
            >
              I already have an account
            </Link>
          </div>
          <p className="mt-8 font-mono text-sm text-slate-600">{"// free forever · your plans stay yours"}</p>
        </motion.div>
      </div>
    </section>
  );
}
