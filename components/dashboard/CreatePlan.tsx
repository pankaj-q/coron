"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const phases = [
  "Reading your goal…",
  "Deciding what matters most…",
  "Scheduling every step…",
  "Polishing the plan…",
];

export function CreatePlan() {
  const router = useRouter();
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setPhase((p) => (p >= phases.length - 1 ? p : p + 1));
    }, 1600);
    return () => clearInterval(interval);
  }, [loading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!task.trim() || loading || cooldown > 0) return;
    setError(null);
    setLoading(true);
    setPhase(0);

    try {
      const res = await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: task.trim(), deadline: deadline.trim() || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 429 && data.retryAfter) {
          setCooldown(data.retryAfter);
        }
        setError(data.error ?? "Couldn't build that plan right now. Try again in a minute.");
        return;
      }
      router.push(`/dashboard/plans/${data.plan.id}`);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 grid place-items-center rounded-3xl bg-[#05060f]/85 backdrop-blur-md"
          >
            <div className="flex flex-col items-center px-8 text-center">
              <div className="relative mb-6 grid h-20 w-20 place-items-center">
                <span className="absolute inset-0 rounded-full border-2 border-violet-500/40 animate-pulse-ring" />
                <span className="absolute inset-0 rounded-full border-2 border-cyan-400/40 animate-pulse-ring [animation-delay:0.8s]" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                  className="h-14 w-14 rounded-full border-4 border-t-transparent border-violet-400"
                />
                <span className="absolute text-2xl">✨</span>
              </div>

              <div className="h-6">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={phase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="font-display text-lg font-semibold text-white"
                  >
                    {phases[phase]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="mt-4 flex gap-1.5">
                {phases.map((_, i) => (
                  <motion.span
                    key={i}
                    animate={{ opacity: i <= phase ? 1 : 0.25, scale: i === phase ? 1.2 : 1 }}
                    className={`h-1.5 w-6 rounded-full ${i <= phase ? "bg-gradient-to-r from-violet-400 to-cyan-400" : "bg-white/15"}`}
                  />
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500">Gemini is thinking — this takes a few seconds.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={handleSubmit}
        className="glass-strong glow-border relative rounded-3xl p-5 shadow-2xl shadow-black/40 sm:p-6"
      >
        <label htmlFor="task" className="mb-2 block text-sm font-semibold text-slate-300">
          What do you want to achieve?
        </label>
        <div className="relative">
          <textarea
            id="task"
            ref={textareaRef}
            value={task}
            onChange={(e) => setTask(e.target.value)}
            rows={3}
            placeholder="e.g. Prepare for my data-science interview on Friday"
            className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-base text-white placeholder:text-slate-500 outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20"
          />
          <button
            type="button"
            onClick={() => {
              textareaRef.current?.focus();
              setTask("");
            }}
            className="absolute right-3 top-3 rounded-lg px-2 py-1 text-xs text-slate-500 transition hover:bg-white/5 hover:text-white"
          >
            Clear
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="deadline" className="mb-2 block text-sm font-semibold text-slate-300">
              Deadline / time window <span className="font-normal text-slate-500">(optional)</span>
            </label>
            <input
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="e.g. this Friday · today by 6pm · before my trip"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-base text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={!task.trim() || loading || cooldown > 0}
            className="group relative shrink-0 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-[length:200%_auto] px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-violet-600/30 transition-all hover:bg-right active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="relative z-10 flex items-center gap-2">
              {cooldown > 0 ? (
                <>Try again in {cooldown}s</>
              ) : (
                <>
                  Build my plan
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4 transition-transform group-hover:translate-x-0.5">
                    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </motion.button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
