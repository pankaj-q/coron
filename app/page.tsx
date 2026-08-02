import { BackgroundFX } from "@/components/ui/BackgroundFX";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { Showcase } from "@/components/landing/Showcase";
import { CTA } from "@/components/landing/CTA";
import { CinematicFooter } from "@/components/ui/CinematicFooter";

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
      <CinematicFooter />
    </>
  );
}
