"use client";

import HeroSection from "./components/HeroSection";
import PartnersSlider from "./components/PartnersSlider";
import ContentSection from "./components/ContentSection";
import InteractiveMap from "./components/InteractiveMap";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 font-(--font-geist-sans)">
      {/* Hero Section */}
      <HeroSection />
      {/* Partners Slider */}
      <PartnersSlider />
      {/* Content Section */}
      <ContentSection />

      {/* Mobile Map Section */}
      <section className="block lg:hidden bg-slate-900 py-12 px-4 border-t border-white/10">
        <div className="max-w-xl mx-auto space-y-6 text-center">
          <div className="relative w-full h-80 bg-slate-950/50 rounded-2xl border border-white/5 p-4 flex items-center justify-center">
            <InteractiveMap />
          </div>
        </div>
      </section>
    </div>
  );
}
