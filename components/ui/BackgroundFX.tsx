"use client";

export function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#05060f]"
    >
      <div className="absolute -top-48 -left-40 h-[42rem] w-[42rem] rounded-full bg-violet-700/25 blur-[130px] animate-glow" />
      <div className="absolute top-1/3 -right-48 h-[36rem] w-[36rem] rounded-full bg-cyan-600/20 blur-[130px] animate-glow [animation-delay:1.4s]" />
      <div className="absolute bottom-[-10rem] left-1/4 h-[32rem] w-[32rem] rounded-full bg-fuchsia-700/15 blur-[130px] animate-glow [animation-delay:2.6s]" />
      <div className="absolute inset-0 noise-overlay opacity-50" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:58px_58px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,6,15,0.75)_100%)]" />
    </div>
  );
}
