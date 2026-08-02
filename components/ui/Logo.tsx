export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <div
      className={`relative grid shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-500 shadow-lg shadow-violet-500/40 ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[55%] w-[55%]">
        <circle cx="12" cy="12" r="8.5" stroke="white" strokeWidth="1.4" opacity="0.55" />
        <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.4" opacity="0.8" />
        <path
          d="M9 12.2l2 2 4-4.4"
          stroke="white"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="pointer-events-none absolute inset-0 rounded-xl animate-pulse-ring ring-1 ring-white/60" />
    </div>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark />
      <span className="font-display text-xl font-bold tracking-tight text-white">
        Cor<span className="text-gradient">on</span>
      </span>
    </div>
  );
}
