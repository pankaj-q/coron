import Link from "next/link";
import { TerminalDemo } from "@/components/landing/TerminalDemo";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden px-[clamp(16px,7vw,120px)] pb-[clamp(48px,9vh,120px)] pt-[clamp(160px,24vw,340px)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:26px_26px]" />

      <div className="relative grid items-end gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
        <div>
          <p className="font-courier text-xs tracking-[0.18em] text-[#f5f5f5]/70 sm:text-sm">
            Coron · Your goal, one AI plan · Free
          </p>
          <h1 className="mt-7 font-editorial text-[clamp(2.9rem,8.5vw,7.6rem)] font-light leading-[0.88] tracking-[0.03em] text-[#f5f5f5]">
            <span className="block">Type a goal.</span>
            <span className="block">Get the plan.</span>
            <span className="block text-acid">Start doing.</span>
          </h1>
          <p className="mt-8 max-w-xl font-courier text-sm leading-[1.7] tracking-[0.06em] text-[#f5f5f5]/80 sm:text-base">
            Say what you want in plain words. Coron builds the plan — prioritized steps, realistic
            time, one clear next action. No blank pages, no templates, no guessing.
          </p>
          <div className="mt-10 flex flex-col items-start gap-5">
            <Link
              href="/signup"
              className="inline-flex items-center gap-3 bg-[#f5f5f5] px-[calc(1.4rem)] py-[1.05rem] font-courier text-sm tracking-[0.1em] text-hermes shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-colors hover:bg-white"
            >
              Create my first plan
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-3 border border-[#f5f5f5]/30 px-[calc(1.4rem)] py-[1.05rem] font-courier text-sm tracking-[0.1em] text-[#f5f5f5] transition-colors hover:bg-white/10"
            >
              See how it works
              <span className="text-acid">↓</span>
            </a>
          </div>
          <p className="mt-8 font-courier text-[11px] tracking-[0.1em] text-[#f5f5f5]/40">
            Free forever · No credit card · Your plans stay yours
          </p>
        </div>

        <TerminalDemo />
      </div>
    </section>
  );
}