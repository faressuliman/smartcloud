"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowDownRight, ArrowDownLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { content, certificationLogos, sliderConfig } from "../data/contentData";

export default function CertificationsSlideshow() {
  const { language } = useLanguage();
  const { certifications } = content[language];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1024);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getLogosPerSlide = () => {
    if (windowWidth < 640) return 3;
    if (windowWidth < 1024) return 4;
    return sliderConfig.certificationsPerSlide;
  };

  const logosPerSlide = getLogosPerSlide();
  const slides: typeof certificationLogos[] = [];
  for (let i = 0; i < certificationLogos.length; i += logosPerSlide) {
    slides.push(certificationLogos.slice(i, i + logosPerSlide));
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, sliderConfig.certificationsAutoPlayInterval);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="w-full pb-6 md:pb-10 lg:pb-16"
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 mb-4 sm:mb-8">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 sm:gap-4"
          >
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-800 uppercase tracking-widest rtl:tracking-normal">
              {certifications.title}
            </h2>
            {language === 'en' ? (
              <ArrowDownRight className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
            ) : (
              <ArrowDownLeft className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
            )}
          </motion.div>

          <div className="flex items-center gap-3" dir="ltr">
            <button
              onClick={handlePrevSlide}
              className="h-6 w-6 sm:h-10 sm:w-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-slate-700" />
            </button>
            <button
              onClick={handleNextSlide}
              className="h-6 w-6 sm:h-10 sm:w-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-slate-700" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div
          className="bg-white rounded-2xl p-2 sm:p-6 overflow-hidden"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6"
          >
          {slides[currentSlide]?.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative w-full h-24 lg:h-32 rounded-xl overflow-hidden transition-all"
            >
              <Image
                src={cert.src}
                alt={`Certification ${cert.id}`}
                fill
                className="object-contain p-3 lg:p-4 hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
