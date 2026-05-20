import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { Pricing } from "@/components/landing/Pricing";
import { CareInstructions } from "@/components/landing/CareInstructions";
import { Footer } from "@/components/landing/Footer";
import { useEffect } from "react";
import Lenis from "lenis";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-base font-sans text-gray-800" id="inicio">
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <CareInstructions />
      </main>
      <Footer />
    </div>
  );
}
