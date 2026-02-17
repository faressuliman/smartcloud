"use client";

import { motion } from "framer-motion";

interface SectionIndicatorProps {
  sections: { name: string; icon: any; href?: string }[];
  activeSection: number;
  onSectionChange: (index: number) => void;
}

export default function SectionIndicator({ sections, activeSection, onSectionChange }: SectionIndicatorProps) {
  return (
    <>
      {/* All Devices - Right Side */}
      <div className="flex flex-col gap-4">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const isActive = activeSection === index;
          return (
            <motion.button
              key={index}
              onClick={() => onSectionChange(index)}
              aria-label={`Navigate to ${section.name} section`}
              aria-pressed={isActive}
              className="group relative cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all ${
                  isActive
                    ? "border-primary bg-white shadow-lg shadow-primary/30"
                    : "border-slate-300 bg-white/90 backdrop-blur-sm hover:border-primary"
                }`}
              >
                <Icon
                  className={`transition-colors ${
                    isActive ? "text-primary" : "text-slate-600 group-hover:text-primary"
                  }`}
                  size={24}
                />
              </div>
              {/* Tooltip */}
              <div className="pointer-events-none absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-900/90 px-3 py-2 text-sm text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                {section.name}
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900/90" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </>
  );
}
