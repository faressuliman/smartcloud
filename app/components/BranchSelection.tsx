"use client";

import { useState } from "react";

export default function BranchSelection() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const handleUaeClick = () => {
    window.open("https://turbotechnikmt.com", "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative bg-slate-900 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Choose Your Regional Office
          </h2>
          <p className="text-gray-400">
            Select your location to explore our services
          </p>
        </div>

        {/* World Map */}
        <div className="relative mx-auto h-[600px] w-full max-w-6xl overflow-hidden rounded-lg bg-white">
          {/* World Map Image as background */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg"
            alt="World Map"
            className="h-full w-full object-cover opacity-30"
            style={{ filter: "grayscale(100%) brightness(0.5)" }}
          />
          
          {/* Overlay SVG for pins and interactions */}
          <svg
            viewBox="0 0 2000 1000"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Saudi Arabia Location Pin */}
            <g
              id="saudi-pin"
              transform="translate(1300, 500)"
              onMouseEnter={() => setHoveredCountry("saudi")}
              onMouseLeave={() => setHoveredCountry(null)}
              className="cursor-pointer transition-transform duration-300"
              style={{
                transform: hoveredCountry === "saudi" ? "scale(1.3)" : "scale(1)",
              }}
            >
              {hoveredCountry === "saudi" && (
                <circle
                  cx="0"
                  cy="0"
                  r="30"
                  fill="#E5B838"
                  opacity="0.4"
                  className="animate-pulse"
                />
              )}
              <circle
                cx="0"
                cy="0"
                r="20"
                fill="#E5B838"
                stroke="#fff"
                strokeWidth="3"
              />
              <circle cx="0" cy="0" r="10" fill="#1e3a5f" />
              <path
                d="M 0 20 L -8 35 L 0 30 L 8 35 Z"
                fill="#E5B838"
                stroke="#fff"
                strokeWidth="2"
              />
            </g>

            {/* UAE Location Pin */}
            <g
              id="uae-pin"
              transform="translate(1400, 490)"
              onMouseEnter={() => setHoveredCountry("uae")}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={handleUaeClick}
              className="cursor-pointer transition-transform duration-300"
              style={{
                transform: hoveredCountry === "uae" ? "scale(1.3)" : "scale(1)",
              }}
            >
              {hoveredCountry === "uae" && (
                <circle
                  cx="0"
                  cy="0"
                  r="30"
                  fill="#67A1BF"
                  opacity="0.4"
                  className="animate-pulse"
                />
              )}
              <circle
                cx="0"
                cy="0"
                r="20"
                fill="#67A1BF"
                stroke="#fff"
                strokeWidth="3"
              />
              <circle cx="0" cy="0" r="10" fill="#fff" />
              <path
                d="M 0 20 L -8 35 L 0 30 L 8 35 Z"
                fill="#67A1BF"
                stroke="#fff"
                strokeWidth="2"
              />
            </g>

            {/* Active spots */}
            <circle
              cx="1300"
              cy="500"
              r="60"
              fill="#E5B838"
              opacity={hoveredCountry === "saudi" ? 0.25 : 0.12}
              className="transition-opacity duration-300"
            />
            <circle
              cx="1400"
              cy="490"
              r="60"
              fill="#67A1BF"
              opacity={hoveredCountry === "uae" ? 0.25 : 0.12}
              className="transition-opacity duration-300"
            />
          </svg>

          {/* Hover Tooltips */}
          {hoveredCountry === "saudi" && (
            <div
              className="absolute left-[65%] top-[50%] z-20 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-[#E5B838] px-6 py-3 shadow-lg"
              style={{ pointerEvents: "none" }}
            >
              <h3 className="text-xl font-bold text-[#1e3a5f]">Saudi Arabia</h3>
            </div>
          )}

          {hoveredCountry === "uae" && (
            <div
              className="absolute left-[70%] top-[49%] z-20 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-[#67A1BF] px-6 py-3 shadow-lg"
              style={{ pointerEvents: "none" }}
            >
              <h3 className="text-xl font-bold text-white">
                United Arab Emirates
              </h3>
              <p className="mt-1 text-xs text-white/80">Click to explore</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
