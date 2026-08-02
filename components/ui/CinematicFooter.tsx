"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const linkGroups = [
  { title: "Product", links: ["How it works", "Features", "Showcase"] },
  { title: "Company", links: ["About", "Blog", "Contact"] },
  { title: "Resources", links: ["Help center", "Changelog", "Status"] },
];

const marqueeItems = ["Plan smarter", "Focus first", "Ship faster", "Move with purpose"];

export function CinematicFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        revealRef.current,
        { yPercent: 18, opacity: 0.2 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 25%",
            scrub: true,
          },
        },
      );

      if (textRef.current) {
        gsap.fromTo(
          textRef.current.querySelectorAll("span"),
          { yPercent: 110 },
          {
            yPercent: 0,
            stagger: 0.08,
            ease: "power3.out",
            duration: 1,
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
            },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="relative overflow-hidden bg-[#060712]">
      <div className="absolute -top-48 left-1/2 h-96 w-[62rem] -translate-x-1/2 rounded-full bg-violet-600/25 blur-[130px] animate-glow" />
      <div className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-cyan-500/20 blur-[110px] animate-glow [animation-delay:1.6s]" />
      <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[110px] animate-glow [animation-delay:2.8s]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:62px_62px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]" />

      <div className="relative rotate-[-2deg] overflow-hidden border-y border-white/10 bg-white/[0.02] py-5">
        <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap pr-10">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-10">
              {marqueeItems.map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center gap-10">
                  <span className="font-display text-3xl font-bold uppercase tracking-tight text-white/80 sm:text-4xl">
                    {item}
                  </span>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-violet-400/70">
                    <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div ref={revealRef} className="relative mx-auto max-w-[96rem] px-5 sm:px-6">
        <div className="grid gap-14 py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-32">
          <div>
            <h2 ref={textRef} className="overflow-hidden font-display text-4xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block bg-gradient-to-br from-white via-white to-white/25 bg-clip-text text-transparent">
                Your next goal
              </span>
              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                deserves a plan.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-slate-400">
              Type one sentence. Watch a perfect plan appear. Start moving today — the timeline does the thinking.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton
                href="/signup"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 to-orange-600 px-8 py-4 text-base font-bold text-slate-950 shadow-xl shadow-orange-500/30"
              >
                <span className="relative z-10">Start free — no card needed</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </MagneticButton>
              <MagneticButton
                href="/login"
                className="rounded-2xl glass px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                I already have an account
              </MagneticButton>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:justify-items-end">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((label) => (
                    <li key={label}>
                      <a
                        href="#"
                        className="text-sm text-slate-300 transition-colors hover:text-white"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 sm:flex-row">
          <Logo />
          <p className="text-sm text-slate-500">Built with love · Next.js · Gemini AI · 3D visuals</p>
          <div className="flex items-center gap-3">
            {[
              {
                label: "X",
                path: "M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1.5 2h6.4l4.4 5.9L18.9 2z",
              },
              {
                label: "GitHub",
                path: "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .3.3.6.9.6 1.8V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z",
              },
              {
                label: "LinkedIn",
                path: "M6.9 8.6H3.4V21h3.5V8.6zM5.1 3.5a2 2 0 1 0 0 4.1 2 2 0 0 0 0-4.1zM21 13.4c0-3.3-1.8-4.9-4.1-4.9-1.9 0-2.7 1-3.2 1.8V8.6H10.3V21h3.5v-6.6c0-1.6.8-2.5 2-2.5 1.2 0 1.9.9 1.9 2.5V21H21v-7.6z",
              },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-xl glass text-slate-300 transition-colors hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative select-none overflow-hidden">
        <span className="block bg-gradient-to-b from-white/[0.06] to-transparent bg-clip-text text-center font-display text-[24vw] font-bold leading-[0.75] tracking-tight text-transparent">
          CORON
        </span>
      </div>
    </footer>
  );
}
