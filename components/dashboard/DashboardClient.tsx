"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { CreatePlan } from "@/components/dashboard/CreatePlan";
import { ProgressOverview } from "@/components/dashboard/ProgressOverview";
import { PlanCard } from "@/components/dashboard/PlanCard";
import type { PlanDto } from "@/lib/types";

function timeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function todayLabel() {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function DashboardClient({
  userName,
  userImage,
  plans,
}: {
  userName: string;
  userImage?: string | null;
  plans: PlanDto[];
}) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const totalSteps = plans.reduce((n, p) => n + p.steps.length, 0);
  const doneSteps = plans.reduce((n, p) => n + p.steps.filter((s) => s.done).length, 0);
  const completedPlans = plans.filter((p) => p.steps.length > 0 && p.steps.every((s) => s.done)).length;

  const stats = [
    {
      label: "Total plans",
      value: plans.length,
      chip: "from-violet-500 to-indigo-500 shadow-violet-500/25",
      glow: "group-hover:shadow-violet-500/40",
      icon: "M4 6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm9 0a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2V6zM4 15a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3zm9 0a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3z",
    },
    {
      label: "Steps completed",
      value: `${doneSteps}/${totalSteps}`,
      chip: "from-cyan-500 to-sky-500 shadow-cyan-500/25",
      glow: "group-hover:shadow-cyan-500/40",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: "Plans finished",
      value: completedPlans,
      chip: "from-emerald-500 to-teal-500 shadow-emerald-500/25",
      glow: "group-hover:shadow-emerald-500/40",
      icon: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12zm0 0v6",
    },
  ];

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#05060f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[96rem] items-center justify-between px-5 py-3.5 sm:px-6">
          <Logo />
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/profile"
              className="group hidden items-center gap-2.5 sm:flex"
              title="Edit profile"
            >
              <div className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-sm font-bold text-white ring-2 ring-white/10 transition group-hover:ring-violet-400/60">
                {userImage ? (
                  <img src={userImage} alt={userName} className="h-full w-full object-cover" />
                ) : (
                  userName.charAt(0).toUpperCase()
                )}
                <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/25" />
              </div>
              <span className="text-sm font-medium text-slate-300">{userName}</span>
            </Link>
            <Link
              href="/dashboard/profile"
              className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-sm font-bold text-white ring-2 ring-white/10 transition hover:ring-violet-400/60 sm:hidden"
              title="Edit profile"
            >
              {userImage ? (
                <img src={userImage} alt={userName} className="h-full w-full object-cover" />
              ) : (
                userName.charAt(0).toUpperCase()
              )}
            </Link>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 disabled:opacity-60"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M15 12H3m0 0l4-4m-4 4l4 4m9-11h4a1 1 0 011 1v12a1 1 0 01-1 1h-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {loggingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[96rem] px-5 pt-10 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="mb-1.5 text-sm font-medium text-violet-300">{mounted ? todayLabel() : "Today"}</p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {mounted ? `${timeOfDay()}, ${userName.split(" ")[0]}.` : `Welcome, ${userName.split(" ")[0]}.`}
            </h1>
            <p className="mt-2 text-slate-400">
              Describe a goal — big or small — and watch your plan unfold.
            </p>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-emerald-400">
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" strokeLinejoin="round" />
            </svg>
            {plans.length > 0 ? `${doneSteps}/${totalSteps} steps done` : "Ready for your first plan"}
          </span>
        </motion.div>

        <div className="mb-10 grid gap-5 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <CreatePlan />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            <ProgressOverview
              doneSteps={doneSteps}
              totalSteps={totalSteps}
              completedPlans={completedPlans}
              totalPlans={plans.length}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-10 grid gap-5 sm:grid-cols-3"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="flex items-start justify-between">
                <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-shadow duration-300 ${s.chip} ${s.glow}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5.5 w-5.5">
                    <path d={s.icon} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 text-slate-600 transition-colors group-hover:text-slate-400">
                  <path d="M4.5 12h15m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="mt-6 font-display text-3xl font-bold tracking-tight text-white">{s.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">{s.label}</p>
              <div className={`mt-5 h-0.5 w-8 rounded-full bg-gradient-to-r transition-all duration-300 group-hover:w-full ${s.chip.split(" ")[0]} to-transparent`} />
            </div>
          ))}
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
            className="grid place-items-center rounded-3xl border border-white/10 bg-white/[0.03] py-20 text-center"
          >
            <div className="relative mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-600/20 to-cyan-500/20 ring-1 ring-white/10">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7 text-violet-300">
                <path d="M12 2v4m0 12v4M4.9 4.9l2.8 2.8m8.6 8.6l2.8 2.8M2 12h4m12 0h4m-16.7 2.1l2.8-2.8m8.6-8.6l2.8-2.8" strokeLinecap="round" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span className="absolute inset-0 animate-pulse-ring rounded-2xl ring-1 ring-violet-400/40" />
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
