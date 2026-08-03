import Link from "next/link";
import { TerminalDemo } from "@/components/landing/TerminalDemo";

export function Hero() {
  return (
    <section className="relative pt-40 pb-20 sm:pt-48">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] text-violet-300/90">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Goal → Plan → Done
          </span>
          <h1 className="mt-7 font-display text-[clamp(2.6rem,6.5vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-white">
            Type a goal.
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Get the plan.
            </span>
            <br />
            Start doing.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Say what you want in plain words. Coron builds the plan — prioritized steps, realistic
            time, one clear next action. No blank pages, no templates, no guessing.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 px-8 py-4 font-display text-sm font-semibold tracking-wide text-white shadow-[0_8px_32px_rgba(139,92,246,0.4)] transition-transform hover:-translate-y-0.5"
            >
              Create my first plan
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-3 rounded-full glass px-8 py-4 font-display text-sm font-semibold tracking-wide text-slate-200 transition-colors hover:bg-white/10"
            >
              See how it works
              <span className="text-cyan-300">↓</span>
            </a>
          </div>
          <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-slate-500">
            FREE FOREVER · NO CREDIT CARD · YOUR PLANS STAY YOURS
          </p>
        </div>

        <TerminalDemo />
      </div>
    </section>
  );
}