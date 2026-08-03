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
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full glass px-5 py-3 sm:px-8">
        <div className="flex items-center gap-5 sm:gap-8">
          <a
            href="#features"
            className="link-underline font-display text-sm font-semibold tracking-wide text-[#e8ebff]/80 hover:text-white"
          >
            How it works
          </a>
          <a
            href="#goals"
            className="link-underline hidden font-display text-sm font-semibold tracking-wide text-[#e8ebff]/80 hover:text-white sm:inline-block"
          >
            Your plan
          </a>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-display text-xl font-bold tracking-tight text-white">Coron</span>
          <span className="hidden rounded-full bg-white/5 px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-violet-300/80 md:inline-block">
            AI
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden items-center gap-4 text-[#e8ebff]/50 md:flex">
            {social.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="transition-colors duration-200 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
          <a
            href="/signup"
            className="rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 px-5 py-2.5 font-display text-sm font-semibold tracking-wide text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] transition-opacity hover:opacity-90"
          >
            Sign up
          </a>
        </div>
      </nav>
    </header>
  );
}
