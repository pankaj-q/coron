import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ValueRow } from "@/components/landing/ValueRow";
import { Features } from "@/components/landing/Features";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { BackgroundFX } from "@/components/ui/BackgroundFX";

export default function Home() {
  return (
    <div className="relative min-h-screen text-[#e8ebff]">
      <BackgroundFX />
      <Navbar />
      <main>
        <Hero />
        <ValueRow />
        <Features />
        <LandingFooter />
      </main>
    </div>
  );
}
