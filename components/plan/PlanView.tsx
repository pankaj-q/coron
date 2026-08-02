"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ProgressRing } from "@/components/plan/ProgressRing";
import { StepCard } from "@/components/plan/StepCard";
import { fireConfetti, fireBigConfetti } from "@/components/plan/Confetti";
import type { PlanDto, PlanStepDto } from "@/lib/types";

export function PlanView({ plan: initial }: { plan: PlanDto }) {
  const [steps, setSteps] = useState<PlanStepDto[]>(initial.steps);
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const celebrated = useRef(false);

  const doneCount = steps.filter((s) => s.done).length;
  const percent = steps.length ? Math.round((doneCount / steps.length) * 100) : 0;
  const currentIndex = steps.findIndex((s) => !s.done);
  const allDone = steps.length > 0 && currentIndex === -1;

  useEffect(() => {
    if (allDone && !celebrated.current) {
      celebrated.current = true;
      const t = setTimeout(fireBigConfetti, 300);
      return () => clearTimeout(t);
    }
  }, [allDone]);

  async function toggle(step: PlanStepDto) {
    const nextDone = !step.done;
    setSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, done: nextDone } : s)));
    setPending(step.id);
    setError(null);

    try {
      const res = await fetch(`/api/plans/${initial.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId: step.id, done: nextDone }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Update failed");
      }
      if (nextDone) fireConfetti();
    } catch (err) {
      setSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, done: !nextDone } : s)));
      setError((err as Error).message || "Couldn't update the step. Please try again.");
    } finally {
      setPending(null);
    }
  }

  const created = new Date(initial.createdAt).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-8 sm:px-8">
      <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M19 12H5m0 0l6-6m-6 6l6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All plans
        </Link>
      </motion.div>

      <div className="glass-strong glow-border relative overflow-hidden rounded-3xl p-6 shadow-2xl shadow-black/40 sm:p-8">
        <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />

        <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              <span>{created}</span>
              {initial.deadline && (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2.5 py-0.5 normal-case tracking-normal text-rose-300 ring-1 ring-rose-400/20">
                  ⏰ {initial.deadline}
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-2.5 py-0.5 normal-case tracking-normal text-cyan-300 ring-1 ring-cyan-400/20">
                {steps.length} steps
              </span>
              {initial.totalMinutes ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-500/10 px-2.5 py-0.5 normal-case tracking-normal text-fuchsia-300 ring-1 ring-fuchsia-400/20">
                  ~{Math.round(initial.totalMinutes / 60)}h total
                </span>
              ) : null}
            </div>
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {initial.title}
            </h1>
            {initial.summary && (
              <p className="mt-3 max-w-xl leading-relaxed text-slate-400">{initial.summary}</p>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 160 }}
            className="shrink-0 self-start sm:self-center"
          >
            <ProgressRing percent={percent} />
          </motion.div>
        </div>
      </div>

      {initial.focus && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="relative mt-6 overflow-hidden rounded-2xl border border-violet-400/25 bg-violet-500/10 p-5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.25),transparent_55%)]" />
          <div className="relative flex items-start gap-3">
            <span className="relative mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm shadow-lg shadow-violet-500/40">
              🎯
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-violet-300">Focus here first</p>
              <p className="mt-1 text-sm leading-relaxed text-violet-100 sm:text-base">{initial.focus}</p>
            </div>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 overflow-hidden rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="relative mt-12">
        <div className="absolute bottom-0 left-[19px] top-0 w-0.5 bg-white/10 md:left-1/2 md:-translate-x-1/2" />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: steps.length ? Math.max(percent / 100, 0.04) : 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-[19px] top-0 w-0.5 origin-top bg-gradient-to-b from-rose-400 via-amber-400 to-emerald-400 md:left-1/2 md:-translate-x-1/2"
          style={{ boxShadow: "0 0 12px rgba(34,211,238,0.5)" }}
        />

        <div className="space-y-8">
          {steps.map((step, i) => {
            const isCurrent = i === currentIndex;
            const even = i % 2 === 0;
            return (
              <div key={step.id} className={`relative flex md:items-center ${even ? "" : ""}`}>
                <span
                  className={`absolute left-[19px] top-6 z-10 grid h-3.5 w-3.5 -translate-x-1/2 place-items-center rounded-full ring-4 ring-[#0b0d1c] ${
                    step.done
                      ? "bg-emerald-400"
                      : isCurrent
                        ? "bg-violet-400"
                        : "bg-slate-600"
                  }`}
                >
                  {isCurrent && !step.done && (
                    <span className="absolute inset-0 animate-pulse-ring rounded-full ring-2 ring-violet-400/60" />
                  )}
                </span>

                <div className={`w-full pl-10 md:w-[calc(50%-2.5rem)] md:pl-0 ${even ? "md:mr-auto md:pr-0" : "md:ml-auto"}`}>
                  <StepCard step={step} isCurrent={isCurrent} pending={pending === step.id} onToggle={toggle} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative mt-12 overflow-hidden rounded-3xl p-8 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/30 via-teal-600/20 to-cyan-600/30" />
            <div className="noise-overlay absolute inset-0 opacity-30" />
            <div className="relative">
              <span className="text-5xl">🏆</span>
              <h2 className="mt-3 font-display text-3xl font-bold text-white">Mission accomplished!</h2>
              <p className="mt-2 text-emerald-100">
                Every step done. That&apos;s how momentum wins.
              </p>
              <Link
                href="/dashboard"
                className="mt-6 inline-block rounded-2xl bg-white px-6 py-3 text-sm font-bold text-emerald-700 shadow-xl transition-transform hover:scale-105 active:scale-95"
              >
                Back to dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
