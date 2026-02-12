"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import InteractiveMap from "./InteractiveMap";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const handleUaeClick = () => {
    window.open("https://turbotechnikmt.com", "_blank", "noopener,noreferrer");
  };

  const handleSaudiClick = () => {
    window.dispatchEvent(new CustomEvent("showHome"));
  };

  const handleEgyptClick = () => {
    // Add Egypt company link here when available
    console.log("Egypt clicked");
  };

  useEffect(() => {
    const handleLoadingComplete = () => {
      setIsLoadingComplete(true);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("loadingComplete", handleLoadingComplete);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("loadingComplete", handleLoadingComplete);
      }
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-12 sm:py-16 md:py-20 lg:py-0 lg:h-screen"
    >
      {/* Header with Logo */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-linear-to-b from-slate-900/90 via-slate-900/50 to-transparent pt-6 py-12 px-4 sm:px-8 lg:px-12">
        <div className="w-full flex items-center justify-start">
          <Image
            src="/hero/smartcloud.png"
            alt="Smart Cloud Logo"
            width={64}
            height={60}
            className="h-auto w-auto max-w-20 sm:max-w-24 md:max-w-28"
            priority
          />
        </div>
      </div>
      {/* Background Video - Always running */}
      <div
        className="absolute inset-0"
        style={{
          transform: "translateZ(0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden"
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          className="h-full w-full object-cover"
          style={{
            objectPosition: "center bottom",
            transform: "translateZ(0)",
            willChange: "auto",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            pointerEvents: "none",
            isolation: "isolate"
          }}
          poster="/hero/poster.png"
        >
          <source src="/hero/bgvideo.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/80 via-slate-900/70 to-slate-900/80" />
      </div>

      {/* Content Container - Left-aligned with padding */}
      <div className="relative z-10 flex w-full flex-col gap-8 px-4 sm:gap-10 sm:px-8 xl:flex-row xl:items-center xl:gap-32 xl:px-12">
        {/* Left Side - Text Content */}
        <div className="w-full max-w-full sm:max-w-2xl mx-auto sm:mx-0 lg:text-left">
          {/* Mobile text */}
          <motion.div 
            className="block xl:hidden space-y-3"
            initial={{ opacity: 0 }}
            animate={isLoadingComplete ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={isLoadingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl sm:text-2xl font-bold text-white leading-tight"
            >
              Delivering Intelligent Technology Solutions
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={isLoadingComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/90 text-sm sm:text-base"
            >
              We empower businesses with expert guidance and turnkey solutions across smart automation, ELV systems, and marine technical supplies. Delivering innovative, sustainable operations tailored to your unique needs.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={isLoadingComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white/90 text-sm sm:text-base"
            >
              Operating in Saudi Arabia, UAE and Egypt
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={isLoadingComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-semibold text-primary text-sm sm:text-base"
            >
              Choose your country to continue
            </motion.p>
          </motion.div>

          {/* Desktop text */}
          <motion.div 
            className="hidden xl:block"
            initial={{ opacity: 0 }}
            animate={isLoadingComplete ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={isLoadingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight"
            >
              Delivering Intelligent Technology Solutions
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={isLoadingComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-6 md:mb-7"
            >
              We empower businesses with expert guidance and turnkey solutions across smart automation, ELV systems, and marine technical supplies. Delivering innovative, sustainable operations tailored to your unique needs.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={isLoadingComplete ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-2 sm:space-y-2.5"
            >
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={isLoadingComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-primary text-base sm:text-lg md:text-xl lg:text-xl font-semibold"
              >
                Three Regional Offices: Saudi Arabia, UAE and Egypt
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={isLoadingComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-white/70 text-sm sm:text-base md:text-base"
              >
                Select your regional office to explore location-specific services and <br /> connect with our local team.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Section - Flag Buttons with Dotted Line */}
        <div className="w-full xl:hidden flex">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Saudi Arabia Button */}
            <button
              onClick={handleSaudiClick}
              className="flex items-center gap-1 px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-full bg-primary/90 backdrop-blur-sm border-2 border-white/20 shadow-lg hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
            >
              <img
                src="https://flagcdn.com/w40/sa.png"
                alt="Saudi Arabia Flag"
                className="w-4 h-3 sm:w-5 sm:h-4 object-cover rounded shrink-0"
              />
              <span className="text-[10px] sm:text-xs font-bold text-[#1e3a5f]">Saudi Arabia</span>
            </button>

            {/* First Curved Dotted Line Connector (Saudi to UAE) */}
            <svg
              className="opacity-80 shrink-0"
              width="24"
              height="16"
              viewBox="0 0 24 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 8 Q 6 3, 12 8 Q 18 13, 24 8"
                stroke="#E5B838"
                strokeWidth="2"
                strokeDasharray="3 3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* UAE Button */}
            <button
              onClick={handleUaeClick}
              className="flex items-center gap-1 px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-full bg-secondary/90 backdrop-blur-sm border-2 border-white/20 shadow-lg hover:scale-105 hover:bg-secondary transition-all cursor-pointer whitespace-nowrap"
            >
              <img
                src="https://flagcdn.com/w40/ae.png"
                alt="UAE Flag"
                className="w-4 h-3 sm:w-5 sm:h-4 object-cover rounded shrink-0"
              />
              <span className="text-[10px] sm:text-xs font-bold text-white">UAE</span>
            </button>

            {/* Second Curved Dotted Line Connector (UAE to Egypt) */}
            <svg
              className="opacity-80 shrink-0"
              width="24"
              height="16"
              viewBox="0 0 24 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 8 Q 6 3, 12 8 Q 18 13, 24 8"
                stroke="#E5B838"
                strokeWidth="2"
                strokeDasharray="3 3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Egypt Button */}
            <button
              onClick={handleEgyptClick}
              className="flex items-center gap-1 px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-full bg-primary/90 backdrop-blur-sm border-2 border-white/20 shadow-lg hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
            >
              <img
                src="https://flagcdn.com/w40/eg.png"
                alt="Egypt Flag"
                className="w-4 h-3 sm:w-5 sm:h-4 object-cover rounded shrink-0"
              />
              <span className="text-[10px] sm:text-xs font-bold text-[#1e3a5f]">Egypt</span>
            </button>
          </div>
        </div>

        {/* Spacer for Desktop to push map to right */}
        <div className="hidden xl:block xl:flex-1" />

        {/* Desktop Section - Interactive Regional Branch Selector */}
        <div className="hidden xl:block w-full xl:w-125 relative z-20">
          {/* Glassmorphism Container */}
          <div className="relative">
            {/* Container Shadow Layer */}
            <div className="absolute inset-0 bg-linear-to-br from-slate-950/40 via-slate-900/30 to-slate-950/40 rounded-xl sm:rounded-2xl blur-xl transform translate-y-2 translate-x-1 scale-95" />

            {/* Main Container */}
            <motion.div 
              className="relative bg-linear-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-6 border border-slate-700/50 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={isLoadingComplete ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              {/* Inner Glow Accents */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-linear-to-br from-secondary/10 via-transparent to-primary/10 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary/50 to-transparent rounded-t-xl sm:rounded-t-2xl" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent rounded-b-xl sm:rounded-b-2xl" />

              {/* Header Section */}
              <div className="mb-4 sm:mb-4 text-center">
                <h2 className="text-base sm:text-lg font-semibold text-white mb-1">
                  Regional Branch Selector
                </h2>
                <p className="text-xs sm:text-xs text-white/60">
                  Choose your regional office to continue
                </p>
              </div>

              {/* Map Container */}
              <div className="relative w-full h-62.5 min-[375px]:h-67.5 sm:h-75 md:h-85 lg:h-90 overflow-visible">
                <div className="absolute inset-0 bg-linear-to-b from-slate-800/20 to-slate-900/20 rounded-lg sm:rounded-xl -m-1 sm:-m-2" />
                <div className="relative w-full h-full">
                  <InteractiveMap />
                </div>
              </div>

              {/* Footer Hint */}
              <div className="mt-4 sm:mt-4 text-center">
                <p className="text-xs sm:text-xs text-white/50 flex items-center justify-center gap-1.5">
                  <span className="inline-block w-1.5 sm:w-1.5 h-1.5 sm:h-1.5 rounded-full bg-secondary" />
                  <span>Click a location pin to explore services</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}