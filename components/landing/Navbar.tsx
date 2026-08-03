"use client";

const social = [
  {
    label: "GitHub",
    path: "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .3.3.6.9.6 1.8V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z",
  },
  {
    label: "X",
    path: "M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2z",
  },
];

export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 px-[clamp(20px,7vw,120px)] pt-[clamp(44px,6.5vw,88px)]">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="flex items-center gap-5 sm:gap-8">
          <a
            href="#features"
            className="link-underline text-[clamp(0.85rem,calc(1.4vw),1.15rem)] font-bold tracking-[0.03em] text-[#f5f5f5]"
          >
            How it works
          </a>
          <a
            href="#goals"
            className="link-underline hidden text-[clamp(0.85rem,calc(1.4vw),1.15rem)] font-bold tracking-[0.03em] text-[#f5f5f5] sm:inline-block"
          >
            Your plan
          </a>
        </div>

        <div className="flex flex-col items-center leading-none">
          <span className="font-editorial text-[clamp(1.6rem,3.4vw,3rem)] font-light tracking-[0.03em] text-[#f5f5f5]">
            Coron
          </span>
          <span className="mt-1 font-courier text-[0.6rem] tracking-[0.2em] text-[#f5f5f5]/40">
            AI Planner
          </span>
        </div>

        <div className="flex items-center justify-end gap-5 sm:gap-7">
          <div className="hidden items-center gap-4 text-[#f5f5f5]/70 md:flex">
            {social.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="transition-opacity duration-200 hover:opacity-100"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[0.9rem] w-[0.9rem]">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
          <a
            href="/signup"
            className="bg-[#f5f5f5] px-[calc(1.1rem)] py-[0.7rem] font-courier text-[0.75rem] tracking-[0.1em] text-hermes shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-colors hover:bg-white"
          >
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
}