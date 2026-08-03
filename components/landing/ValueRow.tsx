import Link from "next/link";

const items = [
  {
    label: "01 · Input",
    title: "Type the goal",
    body: "Say what you want in plain words. One sentence is enough — no templates, no blank pages.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M5 5h14M5 12h10M5 19h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "02 · Output",
    title: "Get the plan",
    body: "Coron turns it into prioritized steps with realistic time windows. The next action is always obvious.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <rect x="4" y="4" width="16" height="16" rx="2" strokeLinejoin="round" />
        <path d="M8 14l3-3 2 2 3-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "03 · Action",
    title: "Start doing",
    body: "Work the timeline, check steps off as you go, and watch the goal become real.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function ValueRow() {
  return (
    <section id="goals" className="relative py-20">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.label}
            href="/signup"
            className="group relative overflow-hidden rounded-3xl glass p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-white/8"
          >
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-violet-500/15 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
            <p className="relative font-mono text-[11px] tracking-[0.18em] text-violet-300/80">
              {item.label}
            </p>
            <div className="relative mt-6 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-400 text-white shadow-lg">
                {item.icon}
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {item.title}
              </h3>
            </div>
            <p className="relative mt-5 text-sm leading-relaxed text-slate-400">{item.body}</p>
            <p className="relative mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-cyan-300">
              Create my plan
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}