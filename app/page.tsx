"use client";

import HeroSection from "./components/HeroSection";
import PartnersSlider from "./components/PartnersSlider";
import ContentSection from "./components/ContentSection";
import ContactSection from "./components/ContactSection";
import InteractiveMap from "./components/InteractiveMap";
import LocationSection from "./components/LocationSection";
import FooterSection from "./components/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 font-(--font-geist-sans)">
      {/* Hero Section */}
      <HeroSection />
      {/* Partners Slider */}
      <PartnersSlider />
      {/* Content Section */}
      <ContentSection />
      {/* Contact Section */}
      <ContactSection />

      {/* Mobile Map Section */}
      <section className="hidden bg-slate-900 py-12 px-4 border-t border-white/10">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center space-y-3 px-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide rtl:tracking-normal">
              Our Regional Presence
            </h3>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              Click a location pin to explore services in your region
            </p>
          </div>
          <div className="relative w-full h-80 bg-slate-950/50 rounded-2xl border border-white/5 p-4 flex items-center justify-center">
            <InteractiveMap />
          </div>
        </div>
      </section>

      {/* Location Section */}
      <LocationSection />

      {/* Footer Section */}
      <FooterSection />
    </div>
  );
}
