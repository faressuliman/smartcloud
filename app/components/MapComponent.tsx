"use client";

import { useState } from "react";

export default function MapComponent({
  hoveredCountry,
  setHoveredCountry,
  handleUaeClick,
}: {
  hoveredCountry: string | null;
  setHoveredCountry: (country: string | null) => void;
  handleUaeClick: () => void;
}) {
  const [showPopup, setShowPopup] = useState<string | null>(null);

  // Company links for each country
  const handleSaudiClick = () => {
    window.dispatchEvent(new CustomEvent("showHome"));
  };

  const handleEgyptClick = () => {
    // Add Egypt company link here when available
    console.log("Egypt clicked");
  };

  // Pin positions - more spread out across the map
  const positions = {
    egypt: { x: 15, y: 20 }, // Top-left corner
    saudi: { x: 50, y: 75 }, // Bottom center
    uae: { x: 85, y: 25 }, // Top-right corner
  };

  // Generate smooth curved path between two points
  const generateCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
    curveDirection: number = 1
  ) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const offset = distance * 0.3 * curveDirection;

    const perpX = -dy / distance;
    const perpY = dx / distance;

    const control1X = start.x + dx * 0.5 + perpX * offset;
    const control1Y = start.y + dy * 0.5 + perpY * offset;

    return `M ${start.x} ${start.y} Q ${control1X} ${control1Y} ${end.x} ${end.y}`;
  };

  return (
    <div className="relative w-full h-full overflow-visible flex items-center justify-center">
      {/* SVG for abstract map */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Subtle background gradient - static, no animation */}
          <radialGradient id="earthGradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#0a1a2a" stopOpacity="0.2" />
            <stop offset="40%" stopColor="#1e293b" stopOpacity="0.15" />
            <stop offset="70%" stopColor="#334155" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#475569" stopOpacity="0.05" />
          </radialGradient>

          {/* Clip path for circular flags */}
          <clipPath id="circleClip">
            <circle cx="0" cy="0" r="5" />
          </clipPath>
        </defs>

        {/* Subtle static background */}
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          rx="12"
          ry="12"
          fill="url(#earthGradient)"
        />

        {/* Cityscape Background - Small Orange/Blue Buildings (Static) */}
        <g className="cityscape-background" opacity="0.08">
          {/* Building silhouettes - Left side */}
          <rect x="15" y="60" width="3" height="15" rx="0.5" fill="#67A1BF" opacity="0.6" />
          <rect x="20" y="55" width="2.5" height="20" rx="0.5" fill="#E5B838" opacity="0.5" />
          <rect x="24" y="65" width="2" height="10" rx="0.5" fill="#67A1BF" opacity="0.6" />
          <rect x="18" y="70" width="2.5" height="5" rx="0.5" fill="#E5B838" opacity="0.5" />

          {/* Building silhouettes - Right side */}
          <rect x="75" y="50" width="3" height="25" rx="0.5" fill="#67A1BF" opacity="0.6" />
          <rect x="80" y="55" width="2.5" height="20" rx="0.5" fill="#E5B838" opacity="0.5" />
          <rect x="84" y="60" width="2" height="15" rx="0.5" fill="#67A1BF" opacity="0.6" />
          <rect x="78" y="65" width="2.5" height="10" rx="0.5" fill="#E5B838" opacity="0.5" />

          {/* Building silhouettes - Bottom */}
          <rect x="40" y="75" width="2.5" height="12" rx="0.5" fill="#67A1BF" opacity="0.6" />
          <rect x="45" y="78" width="2" height="9" rx="0.5" fill="#E5B838" opacity="0.5" />
          <rect x="50" y="72" width="3" height="15" rx="0.5" fill="#67A1BF" opacity="0.6" />
          <rect x="55" y="76" width="2.5" height="11" rx="0.5" fill="#E5B838" opacity="0.5" />

          {/* Building silhouettes - Top */}
          <rect x="30" y="15" width="2" height="12" rx="0.5" fill="#67A1BF" opacity="0.6" />
          <rect x="35" y="18" width="2.5" height="9" rx="0.5" fill="#E5B838" opacity="0.5" />
          <rect x="60" y="12" width="3" height="15" rx="0.5" fill="#67A1BF" opacity="0.6" />
          <rect x="65" y="15" width="2" height="12" rx="0.5" fill="#E5B838" opacity="0.5" />

          {/* Scattered small structures */}
          <rect x="25" y="45" width="1.5" height="8" rx="0.3" fill="#67A1BF" opacity="0.4" />
          <rect x="70" y="40" width="1.5" height="8" rx="0.3" fill="#E5B838" opacity="0.4" />
          <rect x="35" y="50" width="1.5" height="8" rx="0.3" fill="#67A1BF" opacity="0.4" />
          <rect x="85" y="30" width="1.5" height="8" rx="0.3" fill="#E5B838" opacity="0.4" />
        </g>

        {/* Curved dotted connection lines */}
        {/* Egypt to Saudi - curves upward */}
        <path
          d={generateCurvedPath(positions.egypt, positions.saudi, 1)}
          fill="none"
          stroke="#E5B838"
          strokeWidth="1.2"
          strokeDasharray="2, 3"
          strokeLinecap="round"
          opacity="0.7"
          className="connection-curve"
        />

        {/* Saudi to UAE - curves to the right (outside) */}
        <path
          d={generateCurvedPath(positions.saudi, positions.uae, 1)}
          fill="none"
          stroke="#E5B838"
          strokeWidth="1.2"
          strokeDasharray="2, 3"
          strokeLinecap="round"
          opacity="0.7"
          className="connection-curve"
        />

        {/* UAE to Egypt - curves upward */}
        <path
          d={generateCurvedPath(positions.uae, positions.egypt, 1)}
          fill="none"
          stroke="#E5B838"
          strokeWidth="1.2"
          strokeDasharray="2, 3"
          strokeLinecap="round"
          opacity="0.7"
          className="connection-curve"
        />

        {/* Egypt Pin */}
        <g
          transform={`translate(${positions.egypt.x}, ${positions.egypt.y})`}
          onMouseEnter={() => {
            setHoveredCountry("egypt");
            setShowPopup("egypt");
          }}
          onMouseLeave={() => {
            setHoveredCountry(null);
            setShowPopup(null);
          }}
          onClick={handleEgyptClick}
          className="cursor-pointer transition-all duration-300 hover:scale-110"
        >
          {/* Pulsing glow circle - Red */}
          <circle
            cx="0"
            cy="0"
            r="6"
            fill="#ef4444"
            opacity="0.3"
            className="animate-ping"
            style={{ animationDuration: '2s' }}
          />
          {/* Static outer ring - Red accent */}
          <circle
            cx="0"
            cy="0"
            r="6"
            fill="none"
            stroke="#ef4444"
            strokeWidth="1.5"
            opacity="0.6"
          />
          {/* Inner ring */}
          <circle
            cx="0"
            cy="0"
            r="5"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
          {/* Flag inside circle */}
          <foreignObject x="-5" y="-5" width="10" height="10" clipPath="url(#circleClip)">
            <div className="w-full h-full flex items-center justify-center bg-white rounded-full">
              <img
                src="https://flagcdn.com/w80/eg.png"
                alt="Egypt Flag"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </foreignObject>
        </g>

        {/* Saudi Arabia Pin */}
        <g
          transform={`translate(${positions.saudi.x}, ${positions.saudi.y})`}
          onMouseEnter={() => {
            setHoveredCountry("saudi");
            setShowPopup("saudi");
          }}
          onMouseLeave={() => {
            setHoveredCountry(null);
            setShowPopup(null);
          }}
          onClick={handleSaudiClick}
          className="cursor-pointer transition-all duration-300 hover:scale-110"
        >
          {/* Pulsing glow circle - Green */}
          <circle
            cx="0"
            cy="0"
            r="6"
            fill="#22c55e"
            opacity="0.3"
            className="animate-ping"
            style={{ animationDuration: '2s', animationDelay: '0.3s' }}
          />
          {/* Static outer ring - Green accent */}
          <circle
            cx="0"
            cy="0"
            r="6"
            fill="none"
            stroke="#22c55e"
            strokeWidth="1.5"
            opacity="0.6"
          />
          {/* Inner ring */}
          <circle
            cx="0"
            cy="0"
            r="5"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
          {/* Flag inside circle */}
          <foreignObject x="-5" y="-5" width="10" height="10" clipPath="url(#circleClip)">
            <div className="w-full h-full flex items-center justify-center bg-white rounded-full">
              <img
                src="https://flagcdn.com/w80/sa.png"
                alt="Saudi Arabia Flag"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </foreignObject>
        </g>

        {/* UAE Pin */}
        <g
          transform={`translate(${positions.uae.x}, ${positions.uae.y})`}
          onMouseEnter={() => {
            setHoveredCountry("uae");
            setShowPopup("uae");
          }}
          onMouseLeave={() => {
            setHoveredCountry(null);
            setShowPopup(null);
          }}
          onClick={handleUaeClick}
          className="cursor-pointer transition-all duration-300 hover:scale-110"
        >
          {/* Pulsing glow circle - Blue */}
          <circle
            cx="0"
            cy="0"
            r="6"
            fill="#67A1BF"
            opacity="0.3"
            className="animate-ping"
            style={{ animationDuration: '2s', animationDelay: '0.6s' }}
          />
          {/* Static outer ring - Blue accent */}
          <circle
            cx="0"
            cy="0"
            r="6"
            fill="none"
            stroke="#67A1BF"
            strokeWidth="1.5"
            opacity="0.6"
          />
          {/* Inner ring */}
          <circle
            cx="0"
            cy="0"
            r="5"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
          {/* Flag inside circle */}
          <foreignObject x="-5" y="-5" width="10" height="10" clipPath="url(#circleClip)">
            <div className="w-full h-full flex items-center justify-center bg-white rounded-full overflow-hidden">
              <img
                src="https://flagsapi.com/AE/flat/64.png"
                alt="UAE Flag"
                className="w-full h-full object-cover rounded-full scale-[1.6]"
                style={{ objectPosition: 'center' }}
              />
            </div>
          </foreignObject>
        </g>
      </svg>

      {/* Popups - Optimized without backdrop-blur */}
      {showPopup === "egypt" && (
        <div
          onMouseEnter={() => {
            setHoveredCountry("egypt");
            setShowPopup("egypt");
          }}
          onMouseLeave={() => {
            setHoveredCountry(null);
            setShowPopup(null);
          }}
          className="absolute"
          style={{
            left: `${positions.egypt.x}%`,
            top: `${positions.egypt.y}%`,
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            pointerEvents: "auto",
          }}
        >
          {/* Extended invisible bridge area */}
          <div className="absolute w-full" style={{ top: "-5px", left: "0", height: "80px" }} />

          <div className="bg-slate-900 text-white rounded-lg shadow-2xl p-4 min-w-[200px] max-w-[280px] border-2 border-red-500" style={{ marginTop: "60px" }}>
            <h3 className="text-lg font-bold text-white mb-2">
              Egypt
            </h3>
            <p className="text-sm text-gray-300 mb-3">
              Visit our branch at Cairo, Egypt
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleEgyptClick();
              }}
              className="w-full cursor-pointer rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-800"
            >
              Explore Services
            </button>
          </div>
        </div>
      )}

      {showPopup === "saudi" && (
        <div
          onMouseEnter={() => {
            setHoveredCountry("saudi");
            setShowPopup("saudi");
          }}
          onMouseLeave={() => {
            setHoveredCountry(null);
            setShowPopup(null);
          }}
          className="absolute"
          style={{
            left: `${positions.saudi.x}%`,
            top: `${positions.saudi.y}%`,
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            pointerEvents: "auto",
          }}
        >
          {/* Extended invisible bridge area */}
          <div className="absolute w-full" style={{ top: "-5px", left: "0", height: "80px" }} />

          <div className="bg-slate-900 text-white rounded-lg shadow-2xl p-4 min-w-[200px] max-w-[280px] border-2 border-green-500" style={{ marginTop: "60px" }}>
            <h3 className="text-lg font-bold text-white mb-2">
              Saudi Arabia
            </h3>
            <p className="text-sm text-gray-300 mb-3">
              Visit our branch at Riyadh, Kingdom of Saudi Arabia
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSaudiClick();
              }}
              className="w-full cursor-pointer rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-green-700"
            >
              Explore Services
            </button>
          </div>
        </div>
      )}

      {showPopup === "uae" && (
        <div
          onMouseEnter={() => {
            setHoveredCountry("uae");
            setShowPopup("uae");
          }}
          onMouseLeave={() => {
            setHoveredCountry(null);
            setShowPopup(null);
          }}
          className="absolute"
          style={{
            left: `${positions.uae.x}%`,
            top: `${positions.uae.y}%`,
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            pointerEvents: "auto",
          }}
        >
          {/* Extended invisible bridge area */}
          <div className="absolute w-full" style={{ top: "-5px", left: "0", height: "80px" }} />

          <div className="bg-slate-900 text-white rounded-lg shadow-2xl p-4 min-w-[200px] max-w-[320px] border-2 border-white" style={{ marginTop: "60px" }}>
            <h3 className="text-lg font-bold text-white mb-2 whitespace-nowrap">
              United Arab Emirates
            </h3>
            <p className="text-sm text-gray-300 mb-3">
              Visit our branch at Dubai, United Arab Emirates
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleUaeClick();
              }}
              className="w-full cursor-pointer rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-gray-700"
            >
              Explore Services
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
