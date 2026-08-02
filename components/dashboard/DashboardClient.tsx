"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { CreatePlan } from "@/components/dashboard/CreatePlan";
import { PlanCard } from "@/components/dashboard/PlanCard";
import type { PlanDto } from "@/lib/types";

export function DashboardClient({ userName, plans }: { userName: string; plans: PlanDto[] }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const totalSteps = plans.reduce((n, p) => n + p.steps.length, 0);
  const doneSteps = plans.reduce((n, p) => n + p.steps.filter((s) => s.done).length, 0);
  const completedPlans = plans.filter((p) => p.steps.length > 0 && p.steps.every((s) => s.done)).length;

  const stats = [
    { label: "Total plans", value: plans.length, accent: "text-violet-300" },
    { label: "Steps completed", value: `${doneSteps}/${totalSteps}`, accent: "text-cyan-300" },
    { label: "Plans finished", value: completedPlans, accent: "text-emerald-300" },
  ];

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 border-b border-white/5 glass-strong">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <Logo />
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2.5 sm:flex">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-sm font-bold text-white">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-slate-300">{userName}</span>
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 rounded-xl glass px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 disabled:opacity-60"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M15 12H3m0 0l4-4m-4 4l4 4m9-11h4a1 1 0 011 1v12a1 1 0 01-1 1h-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {loggingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Hey {userName.split(" ")[0]}, what are we <span className="text-gradient">crushing</span> today?
          </h1>
          <p className="mt-2 text-slate-400">Describe a goal — big or small — and watch your plan unfold.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 grid grid-cols-3 gap-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl px-4 py-4 text-center sm:px-6 sm:py-5">
              <p className={`font-display text-2xl font-bold sm:text-3xl ${s.accent}`}>{s.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-slate-500 sm:text-xs">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12"
        >
          <CreatePlan />
        </motion.div>

        <div className="mb-6 flex items-center gap-3">
          <h2 className="font-display text-xl font-bold text-white">Your plans</h2>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-400">
            {plans.length}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        {plans.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass grid place-items-center rounded-3xl py-20 text-center"
          >
            <div className="relative mb-6 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-violet-600/30 to-cyan-500/30">
              <span className="text-4xl">🚀</span>
              <span className="absolute inset-0 rounded-full animate-pulse-ring ring-1 ring-violet-400/50" />
            </div>
            <h3 className="font-display text-xl font-bold text-white">No plans yet</h3>
            <p className="mt-2 max-w-sm text-sm text-slate-400">
              Type your first goal above and let Gemini build you a beautiful, prioritized plan.
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
