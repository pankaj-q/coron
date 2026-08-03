import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ValueRow } from "@/components/landing/ValueRow";
import { Features } from "@/components/landing/Features";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-hermes text-[#f5f5f5]">
      <div className="pointer-events-none fixed inset-0 z-[70] border-[clamp(16px,3vw,30px)] border-hermes" />
      <Navbar />
      <main className="relative uppercase">
        <Hero />
        <ValueRow />
        <Features />
        <LandingFooter />
      </main>
    </div>
  );
}
