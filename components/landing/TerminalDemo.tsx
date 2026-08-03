"use client";

import { useEffect, useState } from "react";

type Line =
  | { type: "cmd"; text: string }
  | { type: "dim"; text: string }
  | { type: "ok"; text: string }
  | { type: "high"; text: string }
  | { type: "med"; text: string }
  | { type: "low"; text: string };

const lines: Line[] = [
  { type: "cmd", text: "coron \"Launch my portfolio in 30 days\"" },
  { type: "dim", text: "→ reading goal · estimating effort…" },
  { type: "dim", text: "→ prioritizing · high / medium / low…" },
  { type: "dim", text: "→ scheduling time windows…" },
  { type: "ok", text: "✓ plan ready — 6 steps · ~28h total" },
  { type: "high", text: "  [HIGH]  today 18:00  · Build core sections" },
  { type: "high", text: "  [HIGH]  tomorrow 09:00 · Write case studies" },
  { type: "med", text: "  [MED]   this week     · Collect testimonials" },
  { type: "low", text: "  [LOW]   launch day    · Ship & announce" },
];

function lineColor(type: Line["type"]) {
  switch (type) {
    case "cmd":
      return "text-white";
    case "dim":
      return "text-slate-500";
    case "ok":
      return "text-emerald-400";
    case "high":
      return "text-rose-300";
    case "med":
      return "text-amber-300";
    case "low":
      return "text-emerald-300";
  }
}

export function TerminalDemo() {
  const [lineIdx, setLineIdx] = useState(-1);
  const [charIdx, setCharIdx] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (lineIdx >= lines.length) {
      const t = setTimeout(() => {
        setLineIdx(-1);
        setCharIdx(0);
      }, 4000);
      return () => clearTimeout(t);
    }
    const current = lines[lineIdx] ?? { text: "" };
    const perChar = current.type === "dim" ? 8 : 16;
    const t = setTimeout(() => {
      if (charIdx < current.text.length) {
        setCharIdx((c) => c + 1);
      } else {
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }
    }, perChar);
    return () => clearTimeout(t);
  }, [started, lineIdx, charIdx]);

  const cursorBlink = lineIdx >= lines.length;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] shadow-2xl shadow-black/60">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-rose-500/80" />
        <span className="h-3 w-3 rounded-full bg-amber-500/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        <span className="ml-3 font-mono text-xs text-slate-500">coron — zsh</span>
        <span className="ml-auto rounded border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-500">
          live demo
        </span>
      </div>

      <div className="min-h-[16rem] space-y-1.5 p-6 font-mono text-[13px] leading-relaxed sm:text-sm">
        {lines.slice(0, lineIdx + 1).map((line, i) =>
          i === lineIdx ? (
            <p key={i} className={lineColor(line.type)}>
              {line.text.slice(0, charIdx)}
              {!cursorBlink && <span className="ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 animate-pulse bg-white" />}
            </p>
          ) : (
            <p key={i} className={lineColor(line.type)}>
              {line.text}
            </p>
          ),
        )}
        {cursorBlink && (
          <p className="text-slate-500">
            <span className="text-emerald-400">$</span>{" "}
            <span className="ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 animate-pulse bg-white" />
          </p>
        )}
      </div>
    </div>
  );
}
