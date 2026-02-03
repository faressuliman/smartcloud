"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Ship, Clock, Award, Wrench, Zap, Target } from "lucide-react";

const services = [
  {
    icon: Ship,
    title: "Marine Equipment Supply",
    description: "Comprehensive range of marine equipment and supplies for all vessel types.",
  },
  {
    icon: Wrench,
    title: "Ship Maintenance",
    description: "Expert maintenance services to keep your vessels in optimal condition.",
  },
  {
    icon: Zap,
    title: "Technical Support",
    description: "24/7 technical support and consultation for all your maritime needs.",
  },
  {
    icon: Target,
    title: "Custom Solutions",
    description: "Tailored engineering solutions designed specifically for your requirements.",
  },
];

export default function ServiceSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextService = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevService = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-white to-slate-50 border-2 border-secondary/20 shadow-lg">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-8"
        >
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="shrink-0 h-12 w-12 sm:h-16 sm:w-16 rounded-lg flex items-center justify-center bg-linear-to-br from-primary/20 to-secondary/20">
              {(() => {
                const Icon = services[currentIndex].icon;
                return <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />;
              })()}
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-slate-900">
                {services[currentIndex].title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {services[currentIndex].description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-secondary/30 hover:bg-secondary/50"
              }`}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>

        {/* Previous/Next Buttons */}
        <button
          onClick={prevService}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-secondary/20 hover:bg-primary hover:text-white transition-all shadow-lg"
          aria-label="Previous service"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextService}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-secondary/20 hover:bg-primary hover:text-white transition-all shadow-lg"
          aria-label="Next service"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
