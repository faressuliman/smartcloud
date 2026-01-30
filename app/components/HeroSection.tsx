"use client";

import { ChevronDown, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

interface HeroSectionProps {
  onScrollToNext: () => void;
}

export default function HeroSection({ onScrollToNext }: HeroSectionProps) {
  const [showSaudiTooltip, setShowSaudiTooltip] = useState(false);
  const [showUaeTooltip, setShowUaeTooltip] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleUaeClick = () => {
    window.open("https://turbotechnikmt.com", "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Video - Always running */}
      <div className="absolute inset-0 top-20">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          style={{ objectPosition: "center bottom" }}
          poster="/posterImage.png"
        >
          <source src="/backgroundvid.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side - Text Content */}
        <div className="max-w-2xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Transforming Vision Into Reality
          </h1>
          
          <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-6">
            We empower businesses with expert guidance and turnkey solutions across smart automation, ELV systems, and marine technical supplies. Delivering innovative, sustainable operations tailored to your unique needs.
          </p>

          <p className="text-[#E5B838] text-lg lg:text-xl font-semibold mb-8 lg:mb-0">
            Two Regional Offices: Saudi Arabia & UAE
          </p>

          {/* Mobile Location Buttons - Horizontal Layout */}
          <div className="flex lg:hidden items-center justify-center gap-4 mt-8">
            {/* Saudi Arabia Button */}
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E5B838]/90 backdrop-blur-sm border-2 border-white/20 shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#1e3a5f]" />
              <span className="text-xs font-bold text-[#1e3a5f]">Saudi Arabia</span>
            </button>

            {/* Horizontal Curved Dotted Line Connector */}
            <svg 
              className="opacity-80 flex-shrink-0" 
              width="48" 
              height="20"
              viewBox="0 0 48 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M0 10 Q 12 4, 24 10 Q 36 16, 48 10" 
                stroke="#E5B838" 
                strokeWidth="2" 
                strokeDasharray="4 4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* UAE Button */}
            <button
              onClick={handleUaeClick}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#67A1BF]/90 backdrop-blur-sm border-2 border-white/20 shadow-lg hover:scale-105 hover:bg-[#67A1BF] transition-all cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-xs font-bold text-white">UAE</span>
            </button>
          </div>
        </div>

        {/* Right Side - Location Buttons (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col relative">
          {/* Saudi Arabia Button */}
          <div className="relative">
            <button
              onMouseEnter={() => setShowSaudiTooltip(true)}
              onMouseLeave={() => setShowSaudiTooltip(false)}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#E5B838]/90 backdrop-blur-sm border-2 border-white/20 shadow-lg hover:scale-105 transition-all cursor-pointer animate-pulse"
              style={{ animationDuration: '3s' }}
            >
              <MapPin className="w-5 h-5 text-[#1e3a5f]" />
              <span className="text-sm font-bold text-[#1e3a5f]">Saudi Arabia</span>
            </button>

            {/* Saudi Arabia Tooltip */}
            {showSaudiTooltip && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#E5B838] text-[#1e3a5f] px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-in fade-in duration-200">
                Riyadh, Saudi Arabia
              </div>
            )}
          </div>

          {/* Curved Dotted Line Connector - VERTICAL for Desktop */}
          <div className="flex justify-center my-2">
            <svg 
              className="opacity-80" 
              width="20" 
              height="48"
              viewBox="0 0 20 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M10 0 Q 16 12, 10 24 Q 4 36, 10 48" 
                stroke="#E5B838" 
                strokeWidth="2" 
                strokeDasharray="4 4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* UAE Button */}
          <div className="relative">
            <button
              onMouseEnter={() => setShowUaeTooltip(true)}
              onMouseLeave={() => setShowUaeTooltip(false)}
              onClick={handleUaeClick}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#67A1BF]/90 backdrop-blur-sm border-2 border-white/20 shadow-lg hover:scale-105 hover:bg-[#67A1BF] transition-all cursor-pointer animate-pulse"
              style={{ animationDuration: '3s', animationDelay: '0.5s' }}
            >
              <MapPin className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white">UAE</span>
            </button>

            {/* UAE Tooltip */}
            {showUaeTooltip && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#67A1BF] text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-in fade-in duration-200">
                <div className="font-medium mb-0.5">Dubai, United Arab Emirates</div>
                <div className="text-xs text-white/80">Click to explore</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Down Button */}
      <motion.button
        onClick={onScrollToNext}
        aria-label="Scroll to next section"
        className="absolute bottom-20 sm:bottom-16 md:bottom-6 left-1/2 z-10 -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          y: { duration: 1.5, repeat: Infinity, delay: 1 },
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown className="h-8 w-8 text-cyan-400" aria-hidden="true" />
      </motion.button>

    </section>
  );
}
