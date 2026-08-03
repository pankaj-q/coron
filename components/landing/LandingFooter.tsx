import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="relative overflow-hidden bg-hermes pt-[clamp(80px,16vh,200px)]">
      <div className="relative mx-auto max-w-4xl px-6 pb-[clamp(80px,18vh,220px)] text-center">
        <p className="font-courier text-xs tracking-[0.18em] text-[#f5f5f5]/70">Coron</p>
        <h2 className="mt-7 font-editorial text-[clamp(2.6rem,6.5vw,5.6rem)] font-light leading-[0.9] tracking-[0.03em] text-[#f5f5f5]">
          <span className="block">Your next goal</span>
          <span className="block text-acid">Deserves a plan.</span>
        </h2>
        <p className="mx-auto mt-9 max-w-2xl font-courier text-sm leading-[1.7] tracking-[0.06em] text-[#f5f5f5]/80">
          One sentence in, a real plan out — prioritized, timed, ready to start. No more deciding
          what to do next. Only doing it.
        </p>
        <Link
          href="/signup"
          className="mt-10 inline-flex items-center gap-3 bg-[#f5f5f5] px-[calc(1.6rem)] py-[1.1rem] font-courier text-sm tracking-[0.1em] text-hermes shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-colors hover:bg-white"
        >
          Turn your next goal into a plan
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="pointer-events-none select-none overflow-hidden">
        <span className="block text-center font-editorial text-[clamp(6rem,22vw,19rem)] font-light leading-[0.75] tracking-[0.02em] text-acid/15">
          Coron
        </span>
      </div>

      <div className="relative flex items-center justify-between border-t border-[#f5f5f5]/10 px-[clamp(16px,7vw,120px)] py-6 font-courier text-[11px] tracking-[0.1em] text-[#f5f5f5]/50">
        <span>Coron v0.1</span>
        <span className="text-center text-[#f5f5f5]/40">
          Built with Next.js · Gemini AI
        </span>
        <span>MIT License · 2026</span>
      </div>
    </footer>
  );
}
