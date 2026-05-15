import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { Pricing } from "@/components/landing/Pricing";
import { CareInstructions } from "@/components/landing/CareInstructions";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-base font-sans text-gray-800 scroll-smooth" id="inicio">
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
