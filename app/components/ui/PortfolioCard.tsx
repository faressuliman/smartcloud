"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { memo } from "react";

interface PortfolioCardProps {
  portfolio: {
    id: string;
    title: string;
    description: string;
    icon: any;
    overview: string;
    highlights: string[];
    image: string;
  };
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  language?: string;
}

const PortfolioCard = memo(function PortfolioCard({ portfolio, currentIndex, onPrev, onNext, language = 'en' }: PortfolioCardProps) {
  const isRTL = language === 'ar';
  const handleLeftClick = isRTL ? onNext : onPrev;
  const handleRightClick = isRTL ? onPrev : onNext;
  const labels = language === 'ar' ? { overview: 'نظرة عامة', keyHighlights: 'أبرز النقاط' } : { overview: 'Overview', keyHighlights: 'Key Highlights' };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
      className="absolute inset-0 flex flex-col lg:flex-row"
    >
      {/* Mobile Layout - Full Background with Overlay */}
      <div className="lg:hidden absolute inset-0">
        <div className="absolute inset-0">
          {/* Background Image */}
          <img
            src={portfolio.image}
            alt={portfolio.title}
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col px-6 py-8">
          {/* Title with Navigation Arrows */}
          <div dir="ltr" className="flex items-center justify-between gap-4 mb-8">
            <button
              onClick={handleLeftClick}
              className="text-white/80 hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-bold text-white text-center uppercase leading-tight"
            >
              {portfolio.title}
            </motion.h3>

            <button
              onClick={handleRightClick}
              className="text-white/80 hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 overflow-y-auto"
          >
            {/* Overview */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6"
            >
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white/90 leading-relaxed text-base text-center"
              >
                {portfolio.overview}
              </motion.p>
            </motion.div>

            {/* Key Highlights */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-6"
            >
              <h4 className="text-white/60 text-xs uppercase tracking-wider rtl:tracking-normal mb-4 font-semibold text-center">
                {labels.keyHighlights}
              </h4>
              <div className="space-y-3">
                {portfolio.highlights.map((highlight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-secondary" />
                    <p className="text-white/80 text-sm leading-relaxed">
                      {highlight}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* View Case Study Button - Removed */}

          </motion.div>
        </div>
      </div>

      {/* Desktop Layout - Left Side Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-slate-100/50 h-full">
        <div className="absolute inset-0">
          <img
            src={portfolio.image}
            alt={portfolio.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Desktop Layout - Right Side Content */}
      <div className="hidden lg:block lg:w-1/2 relative bg-slate-800/95 h-full">
        <div className="px-16 py-8 sm:px-20 lg:pl-14 lg:pr-24 lg:py-12 h-full flex flex-col">
          {/* Icon and Title */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-secondary/20"
            >
              <portfolio.icon
                className="w-7 h-7 text-secondary"
              />
            </div>
            <div className="flex-1">
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight"
              >
                {portfolio.title}
              </motion.h3>
            </div>
          </div>

          {/* Overview */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <h4 className="text-white/40 text-xs uppercase tracking-wider rtl:tracking-normal mb-3 font-semibold">
              {labels.overview}
            </h4>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/70 leading-relaxed text-sm lg:text-base"
            >
              {portfolio.overview}
            </motion.p>
          </motion.div>

          {/* Key Highlights */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8 flex-1"
          >
            <h4 className="text-white/40 text-xs uppercase tracking-wider rtl:tracking-normal mb-4 font-semibold">
              {labels.keyHighlights}
            </h4>
            <div className="space-y-3">
              {portfolio.highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-secondary"
                  />
                  <p className="text-white/70 text-sm leading-relaxed">
                    {highlight}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* View Case Study Button - Removed */}

        </div>
      </div>

      {/* Left Navigation Arrow - hidden on mobile, visible on desktop */}
      <button
        onClick={handleLeftClick}
        className="hidden lg:flex absolute left-4 sm:left-5 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-primary shadow-lg items-center justify-center text-white hover:bg-primary-dark transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      {/* Right Navigation Arrow - hidden on mobile, visible on desktop */}
      <button
        onClick={handleRightClick}
        className="hidden lg:flex absolute right-4 sm:right-5 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-primary shadow-lg items-center justify-center text-white hover:bg-primary-dark transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
});

export default PortfolioCard;
