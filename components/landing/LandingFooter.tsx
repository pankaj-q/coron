import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 pb-8 pt-24 sm:pt-32">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-64 w-96 rounded-full bg-cyan-500/15 blur-[110px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="font-mono text-xs tracking-[0.2em] text-violet-300/80">CORON</p>
        <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
          Turn your next goal
          <br />
          <span className="text-gradient">into a real plan.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          One sentence in, a real plan out — prioritized, timed, ready to start. No more deciding
          what to do next. Only doing it.
        </p>
        <Link
          href="/signup"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 px-9 py-4 font-display text-sm font-semibold tracking-wide text-white shadow-[0_8px_32px_rgba(139,92,246,0.4)] transition-transform hover:-translate-y-0.5"
        >
          Create my plan &mdash; it&apos;s free
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="pointer-events-none relative select-none overflow-hidden pt-10">
        <span className="block bg-gradient-to-b from-white/20 to-white/[0.03] bg-clip-text text-center font-display text-[clamp(6rem,24vw,20rem)] font-black leading-[0.8] tracking-tight text-transparent">
          Coron
        </span>
      </div>

      <div className="relative mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/5 px-6 pt-6 sm:flex-row sm:px-10">
        <span className="font-mono text-[11px] tracking-[0.1em] text-slate-500">Coron v0.1</span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-slate-600">
          Built with Next.js · Gemini AI
        </span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-slate-500">MIT License · 2026</span>
      </div>
    </footer>
  );
}