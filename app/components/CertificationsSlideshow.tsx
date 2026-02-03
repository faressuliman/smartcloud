"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";

export default function CertificationsSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    [
      { id: 1, src: "/certifications/1.jpg" },
      { id: 2, src: "/certifications/2.png" },
      { id: 3, src: "/certifications/3.jpg" },
      { id: 4, src: "/certifications/4.jpg" },
      { id: 5, src: "/certifications/5.jpg" },
    ],
    [
      { id: 6, src: "/certifications/6.png" },
      { id: 7, src: "/certifications/7.jpg" },
      { id: 8, src: "/certifications/88.png" },
      { id: 9, src: "/certifications/9.jpg" },
    ],
  ];

  // Auto-play logic
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const handlePrevSlide = () => {
    stopAutoPlay();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    startAutoPlay();
  };

  const handleNextSlide = () => {
    stopAutoPlay();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    startAutoPlay();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    stopAutoPlay();
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextSlide();
    }
    if (isRightSwipe) {
      handlePrevSlide();
    }
    startAutoPlay(); // Resume autoplay after touch
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="w-full mt-12 sm:mt-16 pb-14 mb-14 border-b border-slate-200/60"
    >
      {/* Certifications Header */}
      <div className="mb-8 flex items-center gap-4 px-2 sm:px-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 uppercase tracking-widest">
          Certifications
        </h2>
        <ArrowDownRight className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
      </div>

      {/* Desktop View - Slide Navigation */}
      <div
        className="hidden md:block relative px-4 sm:px-8 lg:px-12 py-4 rounded-2xl shadow-2xl shadow-slate-400/40 bg-white"
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-5 gap-6 lg:gap-8"
        >
          {slides[currentSlide].map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative w-full h-32 sm:h-40 md:h-48 rounded-xl overflow-hidden hover:border-secondary/80 transition-all"
            >
              <Image
                src={cert.src}
                alt={`Certification ${cert.id}`}
                fill
                className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Slide Indicators */}
        <div className="flex gap-2 justify-center mt-8 sm:mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                stopAutoPlay();
                setCurrentSlide(index);
                startAutoPlay();
              }}
              className={`h-2 rounded-full transition-all ${index === currentSlide
                ? "w-8 bg-primary"
                : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile/Tablet View - Horizontal Scroll */}
      <div
        ref={containerRef}
        className="md:hidden flex overflow-x-auto gap-3 px-4 sm:px-6 py-4 snap-x snap-mandatory scroll-smooth rounded-2xl shadow-2xl shadow-slate-400/40 bg-white"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {slides.flat().map((cert) => (
          <motion.div
            key={cert.id}
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 snap-center"
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={cert.src}
              alt={`Certification ${cert.id}`}
              fill
              className="w-full h-full object-contain p-2"
            />
          </motion.div>
        ))}
      </div>

      {/* Mobile/Tablet Scroll Indicator */}
    </motion.div>
  );
}
