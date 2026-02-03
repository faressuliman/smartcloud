"use client";

import HeroSection from "./components/HeroSection";
import ContentSection from "./components/ContentSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 font-(--font-geist-sans)">
      {/* Hero Section */}
      <HeroSection />
      {/* Content Section */}
      <ContentSection />
    </div>
  );
}
