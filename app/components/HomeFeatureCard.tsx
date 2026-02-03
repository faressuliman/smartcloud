"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HomeFeatureCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  isMobile?: boolean;
  animationDelay?: number;
  currentIndex?: number;
  totalCards?: number;
  onDotClick?: (index: number) => void;
}

export default function HomeFeatureCard({
  imageSrc,
  imageAlt,
  title,
  description,
  isMobile = false,
  animationDelay = 0,
  currentIndex,
  totalCards = 3,
  onDotClick,
}: HomeFeatureCardProps) {
  const cardContent = (
    <div className={`relative z-10 bg-white border border-secondary/30 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isMobile
      ? "p-6 pb-8 h-82 flex flex-col"
      : "p-4 sm:p-6 md:p-4 lg:p-8 h-full flex flex-col"
      }`}>
      <div className="mb-4 sm:mb-6 md:mb-3 lg:mb-6 flex items-center justify-start">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={120}
          height={120}
          className="h-auto w-auto max-w-25 sm:max-w-30 md:max-w-20 lg:max-w-30"
        />
      </div>
      <div className="flex items-center gap-2 mb-3 md:mb-2 lg:mb-3 text-left">
        <h3 className="text-xl sm:text-lg md:text-base lg:text-xl font-bold text-slate-900">
          {title}
        </h3>
      </div>
      <p className={`text-slate-600 leading-relaxed text-left ${isMobile
        ? "text-xs mb-4 flex-1"
        : "text-xs sm:text-sm md:text-xs lg:text-sm flex-1"
        }`}>
        {description}
      </p>
      {/* Dots Indicator - Only for mobile */}
      {isMobile && currentIndex !== undefined && totalCards && onDotClick && (
        <div className="flex justify-center gap-2 mt-auto pt-2">
          {Array.from({ length: totalCards }).map((_, index) => (
            <button
              key={index}
              onClick={() => onDotClick(index)}
              className={`h-2 rounded-full transition-all ${index === currentIndex ? "bg-primary w-6" : "bg-secondary/30 w-2"
                }`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div className="w-full shrink-0 px-4">
        {cardContent}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: animationDelay }}
    >
      {cardContent}
    </motion.div>
  );
}
