const cards = [
  {
    num: "#1",
    title: "Plan",
    headline: "From one sentence to a schedule",
    body: "Type your goal the way you'd say it. Coron turns it into structured, step-by-step action.",
    visual: (
      <div className="flex items-center gap-3">
        <div className="flex-1 border border-[#0000f2]/15 p-3 text-center font-courier text-[11px] tracking-[0.1em] text-hermes/70">
          Launch my portfolio
        </div>
        <span className="font-courier text-hermes">→</span>
        <div className="flex-1 border border-[#0000f2] bg-[#0000f2] p-3 text-center font-courier text-[11px] tracking-[0.1em] text-white">
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
          { label: "HIGH", w: "w-full", fill: "bg-hermes" },
          { label: "MED", w: "w-2/3", fill: "bg-hermes/60" },
          { label: "LOW", w: "w-1/3", fill: "bg-hermes/30" },
        ].map((p) => (
          <div key={p.label} className="flex items-center gap-3">
            <span className="w-14 font-courier text-[11px] tracking-[0.1em] text-hermes/70">{p.label}</span>
            <span className={`h-2 ${p.w} ${p.fill}`} />
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
            <span className="w-9 font-courier text-[10px] tracking-[0.1em] text-hermes/60">{day}</span>
            <div className="flex flex-1 gap-1">
              {(cells as number[]).map((c, i) => (
                <span key={i} className={`h-5 flex-1 ${c ? "bg-hermes" : "border border-[#0000f2]/15"}`} />
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
        <svg viewBox="0 0 100 100" className="h-20 w-20 -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,0,242,0.12)" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#0000f2"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="263.9"
            strokeDashoffset="88"
          />
        </svg>
        <div className="flex-1 space-y-2">
          {[
            { t: "Define positioning", done: true },
            { t: "Build core sections", done: true },
            { t: "Collect testimonials", done: false },
          ].map((s) => (
            <div key={s.t} className="flex items-center gap-2.5 font-courier text-[11px] tracking-[0.05em]">
              <span
                className={`grid h-3.5 w-3.5 place-items-center ${s.done ? "bg-hermes" : "border border-[#0000f2]/30"}`}
              >
                {s.done && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" className="h-2 w-2">
                    <path d="M5 12l5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className={s.done ? "text-hermes/40 line-through" : "text-hermes/80"}>{s.t}</span>
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
            <span className="flex-1 font-courier text-[11px] tracking-[0.05em] text-hermes/80">{p.t}</span>
            <span className="h-1.5 w-24 bg-[#0000f2]/10">
              <span className={`block h-full ${p.pct} bg-hermes`} />
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
        <div className="grid h-16 w-16 place-items-center bg-hermes">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" className="h-8 w-8">
            <path d="M5 12l5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-center font-courier text-[11px] leading-[1.7] tracking-[0.12em] text-hermes/70">
          ALL 6 STEPS COMPLETED
          <br />
          <span className="text-hermes">GOAL ACHIEVED ✓</span>
        </p>
      </div>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="relative bg-white text-hermes">
      <div className="absolute right-[clamp(16px,5vw,60px)] top-6 z-10 flex font-courier text-[11px] tracking-[0.14em]">
        <span className="border border-current px-4 py-2">Features</span>
        <span className="border-y border-r border-current px-4 py-2">Preview</span>
      </div>

      <div className="grid gap-x-6 gap-y-[clamp(60px,14vh,150px)] px-[clamp(16px,7vw,120px)] pt-[clamp(90px,16vw,200px)] pb-[clamp(70px,12vw,160px)] md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.num} className="flex flex-col gap-[clamp(24px,4vh,48px)]">
            <div>
              <p className="font-courier text-[11px] tracking-[0.18em] text-hermes/70">
                {card.num} {card.title}
              </p>
              <h3 className="mt-3 font-editorial text-[clamp(1.6rem,2.8vw,2.6rem)] font-light leading-none tracking-[0.02em]">
                {card.headline}
              </h3>
            </div>
            <div className="border border-[#0000f2]/15 p-[clamp(16px,2vw,28px)]">
              {card.visual}
            </div>
            <p className="max-w-[32ch] font-courier text-[13px] leading-[1.7] tracking-[0.04em] text-hermes/80">
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
