const cards = [
  {
    num: "#1",
    title: "Plan",
    headline: "From one sentence to a schedule",
    body: "Type your goal the way you'd say it. Coron turns it into structured, step-by-step action.",
    visual: (
      <div className="flex items-center gap-3">
        <div className="flex-1 rounded-xl border border-white/10 bg-white/5 p-3 text-center font-mono text-[11px] tracking-[0.1em] text-slate-300">
          Launch my portfolio
        </div>
        <span className="font-mono text-cyan-300">→</span>
        <div className="flex-1 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 p-3 text-center font-mono text-[11px] tracking-[0.1em] text-white">
          6 steps · 28h
        </div>
      </div>
    ),
  },
  {
    num: "#2",
    title: "Prioritize",
    headline: "What moves the needle",
    body: "Every step gets high, medium, or low priority — decided for you, instantly.",
    visual: (
      <div className="space-y-3">
        {[
          { label: "HIGH", w: "w-full", fill: "bg-gradient-to-r from-violet-500 to-violet-400" },
          { label: "MED", w: "w-2/3", fill: "bg-cyan-500/80" },
          { label: "LOW", w: "w-1/3", fill: "bg-slate-600" },
        ].map((p) => (
          <div key={p.label} className="flex items-center gap-3">
            <span className="w-14 font-mono text-[11px] tracking-[0.1em] text-slate-400">{p.label}</span>
            <span className={`h-2 rounded-full ${p.w} ${p.fill}`} />
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "#3",
    title: "Schedule",
    headline: "Timed to your pace",
    body: "Realistic slots and durations, spread across your day and week.",
    visual: (
      <div className="space-y-1.5">
        {[
          ["Mon", [0, 1, 1, 0, 0]],
          ["Tue", [1, 1, 1, 1, 0]],
          ["Wed", [0, 0, 1, 1, 0]],
          ["Thu", [1, 1, 0, 0, 0]],
          ["Fri", [0, 1, 1, 1, 1]],
        ].map(([day, cells]) => (
          <div key={day as string} className="flex items-center gap-2">
            <span className="w-9 font-mono text-[10px] tracking-[0.1em] text-slate-500">{day}</span>
            <div className="flex flex-1 gap-1">
              {(cells as number[]).map((c, i) => (
                <span
                  key={i}
                  className={`h-5 flex-1 rounded-sm ${c ? "bg-gradient-to-br from-violet-500 to-cyan-400" : "border border-white/10"}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "#4",
    title: "Track",
    headline: "Progress you can see",
    body: "Check off steps, watch the ring fill, and know exactly what's next.",
    visual: (
      <div className="flex items-center gap-5">
        <div className="relative">
          <svg viewBox="0 0 100 100" className="h-20 w-20 -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="263.9"
              strokeDashoffset="88"
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-mono text-sm text-white">67%</span>
        </div>
        <div className="flex-1 space-y-2">
          {[
            { t: "Define positioning", done: true },
            { t: "Build core sections", done: true },
            { t: "Collect testimonials", done: false },
          ].map((s) => (
            <div key={s.t} className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.05em]">
              <span
                className={`grid h-3.5 w-3.5 place-items-center rounded-full ${s.done ? "bg-gradient-to-br from-violet-500 to-cyan-400" : "border border-white/25"}`}
              >
                {s.done && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" className="h-2 w-2">
                    <path d="M5 12l5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className={s.done ? "text-slate-500 line-through" : "text-slate-300"}>{s.t}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: "#5",
    title: "Remember",
    headline: "Pick up where you left off",
    body: "Your plans live in your account. Reopen any goal and continue exactly where you stopped.",
    visual: (
      <div className="space-y-2">
        {[
          { t: "Launch my portfolio", pct: "w-1/2" },
          { t: "Data-science interview", pct: "w-1/3" },
          { t: "Learn React deeply", pct: "w-full" },
        ].map((p) => (
          <div key={p.t} className="flex items-center gap-3">
            <span className="flex-1 truncate font-mono text-[11px] tracking-[0.05em] text-slate-300">{p.t}</span>
            <span className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
              <span className={`block h-full ${p.pct} rounded-full bg-gradient-to-r from-violet-500 to-cyan-400`} />
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "#6",
    title: "Finish",
    headline: "Cross the finish line",
    body: "Work the steps in order and check every box. A goal isn't real until it's done.",
    visual: (
      <div className="flex flex-col items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-400 shadow-lg">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" className="h-8 w-8">
            <path d="M5 12l5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-center font-mono text-[11px] leading-[1.7] tracking-[0.12em] text-slate-400">
          ALL 6 STEPS COMPLETED
          <br />
          <span className="text-cyan-300">GOAL ACHIEVED ✓</span>
        </p>
      </div>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-cyan-300">FEATURES</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The whole journey, handled.
            </h2>
          </div>
          <span className="hidden rounded-full glass px-4 py-2 font-mono text-[11px] tracking-[0.16em] text-violet-300/80 sm:inline-block">
            GOAL → PLAN → DONE
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <article key={card.num} className="group rounded-3xl glass p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/8">
              <div>
                <p className="font-mono text-xs tracking-[0.18em] text-violet-300/80">
                  {card.num} {card.title}
                </p>
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-white">
                  {card.headline}
                </h3>
              </div>
              <div className="mt-6 rounded-2xl border border-white/5 bg-[#0b0d1c]/60 p-5">
                {card.visual}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-slate-400">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}