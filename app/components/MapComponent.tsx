"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the map to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function MapComponent({
  hoveredCountry,
  setHoveredCountry,
  handleUaeClick,
}: {
  hoveredCountry: string | null;
  setHoveredCountry: (country: string | null) => void;
  handleUaeClick: () => void;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
      // Fix for default marker icons in Next.js
      delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl;
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });
    });
  }, []);

  if (!isMounted || !L) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-800 rounded-lg">
        <p className="text-white">Loading map...</p>
      </div>
    );
  }

  // Custom icon for Saudi Arabia (Gold)
  const saudiIcon = L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 35px;
      height: 35px;
      background-color: #E5B838;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(229, 184, 56, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    ">
      <div style="
        width: 14px;
        height: 14px;
        background-color: #1e3a5f;
        border-radius: 50%;
      "></div>
    </div>`,
    iconSize: [35, 35],
    iconAnchor: [17.5, 17.5],
  });

  // Custom icon for UAE (Blue)
  const uaeIcon = L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 35px;
      height: 35px;
      background-color: #67A1BF;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(103, 161, 191, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    ">
      <div style="
        width: 14px;
        height: 14px;
        background-color: white;
        border-radius: 50%;
      "></div>
    </div>`,
    iconSize: [35, 35],
    iconAnchor: [17.5, 17.5],
  });

  // Coordinates
  const saudiArabia: [number, number] = [23.8859, 45.0792]; // Riyadh, Saudi Arabia
  const uae: [number, number] = [24.4539, 54.3773]; // Abu Dhabi, UAE

  return (
    <MapContainer
      center={[24.2, 49.5]} // Center between Saudi Arabia and UAE
      zoom={6}
      style={{ height: "100%", width: "100%", zIndex: 0 }}
      className="rounded-lg"
    >
      {/* Dark theme tile layer to match website colors */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        opacity={0.8}
      />

      {/* Saudi Arabia Marker */}
      <Marker
        position={saudiArabia}
        icon={saudiIcon}
        eventHandlers={{
          mouseover: () => setHoveredCountry("saudi"),
          mouseout: () => setHoveredCountry(null),
        }}
      >
        <Popup className="custom-popup">
          <div className="text-center">
            <h3 className="text-lg font-bold text-[#1e3a5f]">Saudi Arabia</h3>
            <p className="text-sm text-gray-600">
              Visit our branch at Riyadh, Kingdom of Saudi Arabia
            </p>
          </div>
        </Popup>
      </Marker>

      {/* UAE Marker */}
      <Marker
        position={uae}
        icon={uaeIcon}
        eventHandlers={{
          mouseover: () => setHoveredCountry("uae"),
          mouseout: () => setHoveredCountry(null),
          click: handleUaeClick,
        }}
      >
        <Popup className="custom-popup">
          <div className="text-center">
            <h3 className="text-lg font-bold text-[#67A1BF]">
              United Arab Emirates
            </h3>
            <p className="text-sm text-gray-600">
              Visit our branch at Dubai, United Arab Emirates
            </p>
            <button
              onClick={handleUaeClick}
              className="mt-2 cursor-pointer rounded-full bg-[#E5B838] px-4 py-2 text-sm font-medium text-slate-900 transition-all duration-300 hover:bg-[#d4a732] hover:scale-105"
            >
              Explore Services
            </button>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
