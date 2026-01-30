"use client";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 font-[var(--font-geist-sans)]">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection onScrollToNext={() => {}} />
    </div>
  );
}
