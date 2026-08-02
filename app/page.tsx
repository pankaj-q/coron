import { BackgroundFX } from "@/components/ui/BackgroundFX";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { Showcase } from "@/components/landing/Showcase";
import { CTA } from "@/components/landing/CTA";
import { Logo } from "@/components/ui/Logo";

export default function Home() {
  return (
    <>
      <BackgroundFX />
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Showcase />
        <CTA />
      </main>
      <footer className="border-t border-white/5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 sm:flex-row sm:px-8">
          <Logo />
          <p className="text-sm text-slate-500">
            Built with love · Next.js · Gemini AI · 3D visuals
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#how" className="transition-colors hover:text-white">How it works</a>
            <a href="#features" className="transition-colors hover:text-white">Features</a>
            <a href="#showcase" className="transition-colors hover:text-white">Showcase</a>
          </div>
        </div>
      </footer>
    </>
  );
}
