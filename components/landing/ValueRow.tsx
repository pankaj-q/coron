import Link from "next/link";

const items = [
  {
    label: "01 · Input",
    title: "Type the goal",
    body: "Say what you want in plain words. One sentence is enough — no templates, no blank pages.",
  },
  {
    label: "02 · Output",
    title: "Get the plan",
    body: "Coron turns it into prioritized steps with realistic time windows. The next action is always obvious.",
  },
  {
    label: "03 · Action",
    title: "Start doing",
    body: "Work the timeline, check steps off as you go, and watch the goal become real.",
  },
];

export function ValueRow() {
  return (
    <section id="goals" className="relative px-[clamp(16px,7vw,120px)] pb-[clamp(64px,12vh,150px)]">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.label}
            href="/signup"
            className="group relative flex aspect-[627/547] flex-col justify-between border border-[#f5f5f5]/15 p-[clamp(20px,3vw,40px)] transition-colors hover:border-acid"
          >
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.04)_0_1px,transparent_1px_16px)]" />
            <p className="relative font-courier text-[11px] tracking-[0.14em] text-[#f5f5f5]/50">
              {item.label}
            </p>
            <div className="relative">
              <h3 className="font-editorial text-[clamp(1.8rem,3.4vw,3rem)] font-light leading-none tracking-[0.02em] text-[#f5f5f5]">
                {item.title}
              </h3>
              <p className="mt-4 max-w-xs font-courier text-xs leading-[1.7] tracking-[0.06em] text-[#f5f5f5]/60">
                {item.body}
              </p>
            </div>
            <p className="relative inline-flex items-center gap-2 font-courier text-xs tracking-[0.1em] text-acid">
              Create my plan
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
