"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowDownRight, ArrowDownLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { content, partnerLogos, sliderConfig } from "../data/contentData";

export default function PartnersSlider() {
  const { language } = useLanguage();
  const { partners } = content[language];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1024);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload first slide partner images
  useEffect(() => {
    const preloadPartnerImages = async () => {
      try {
        const firstSlideImages = partnerLogos.slice(0, 7); // First slide logos
        await Promise.all(
          firstSlideImages.map((partner) => {
            return new Promise((resolve) => {
              const img = document.createElement('img');
              img.onload = resolve;
              img.onerror = resolve; // Don't fail if image fails, just continue
              img.src = partner.src;
            });
          })
        );
      } catch (error) {
        console.error('Error preloading partner images:', error);
      }
    };

    preloadPartnerImages();
  }, []);

  const getLogosPerSlide = () => {
    if (windowWidth < 640) return 3;
    if (windowWidth < 1024) return 4;
    return sliderConfig.partnersPerSlide;
  };

  const logosPerSlide = getLogosPerSlide();
  const slides: typeof partnerLogos[] = [];
  for (let i = 0; i < partnerLogos.length; i += logosPerSlide) {
    slides.push(partnerLogos.slice(i, i + logosPerSlide));
  };

  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, sliderConfig.partnersAutoPlayInterval);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  // Intersection Observer to detect when slider is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasBeenSeen(true);
        }
      },
      {
        threshold: 0.1, // Trigger when just 10% of the component is visible
        rootMargin: '0px'
      }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (hasBeenSeen) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [hasBeenSeen]);

  const handlePrevSlide = () => {
    stopAutoPlay();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    if (hasBeenSeen) startAutoPlay();
  };

  const handleNextSlide = () => {
    stopAutoPlay();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    if (hasBeenSeen) startAutoPlay();
  };

  return (
    <div ref={sliderRef} id="partners" className="w-full bg-white pt-6 pb-9 lg:pb-12 shadow-4xl">
      <motion.div
        className="w-full px-4 sm:px-8 lg:px-12 mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-800 uppercase tracking-widest rtl:tracking-normal">
              {partners.title}
            </h2>
            {language === 'en' ? (
              <ArrowDownRight className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
            ) : (
              <ArrowDownLeft className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
            )}
          </motion.div>

          <div className="flex items-center gap-3" dir="ltr">
            <button
              onClick={language === 'ar' ? handleNextSlide : handlePrevSlide}
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" />
            </button>
            <button
              onClick={language === 'ar' ? handlePrevSlide : handleNextSlide}
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" />
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="w-full px-4 sm:px-8 lg:px-12 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        onMouseEnter={stopAutoPlay}
        onMouseLeave={hasBeenSeen ? startAutoPlay : undefined}
      >
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-6">
          {slides[currentSlide]?.map((partner, index) => (
            <motion.div
              key={`${currentSlide}-${partner.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative w-full h-24 lg:h-32 rounded-xl overflow-hidden bg-white transition-all border border-gray-100"
            >
              <Image
                src={partner.src}
                alt={`Partner ${partner.id}`}
                fill
                className="object-contain p-3 lg:p-4 hover:scale-105 transition-transform duration-300"
                priority={currentSlide === 0 && index < 3}
                fetchPriority={currentSlide === 0 ? "high" : "auto"}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
