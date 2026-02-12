"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload logo image immediately
    if (typeof window !== "undefined") {
      const img = document.createElement("img");
      img.src = "/hero/smartcloud.png";
      (img as HTMLImageElement).fetchPriority = "high";
    }

    // Hide loading screen when page is fully loaded AND video is ready
    const handleLoad = () => {
      const startTime = Date.now();
      
      // Check if hero video is loaded, otherwise wait
      const checkVideoReady = setInterval(() => {
        const video = document.querySelector('video') as HTMLVideoElement | null;
        const isVideoReady = video && video.readyState >= 2; // HAVE_CURRENT_DATA or more
        
        if (isVideoReady || Date.now() > startTime + 3500) {
          // Either video loaded or 3.5 seconds passed, proceed
          clearInterval(checkVideoReady);
          setTimeout(() => {
            // Notify other components that loading has finished
            if (typeof window !== "undefined") {
              window.dispatchEvent(new Event("loadingComplete"));
            }
            setIsLoading(false);
          }, 300); // Brief delay for smooth transition
        }
      }, 100);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[1, 2, 3, 4, 5].map((circle) => (
          <motion.div
            key={circle}
            className="absolute rounded-full border border-secondary/20"
            style={{
              width: `${200 + circle * 150}px`,
              height: `${200 + circle * 150}px`,
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + circle,
              repeat: Infinity,
              delay: circle * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Logo with Multiple Animations */}
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          {/* Rotating Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-secondary/30"
            style={{
              width: "200px",
              height: "200px",
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Pulsing Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-secondary/50"
            style={{
              width: "180px",
              height: "180px",
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Logo */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <Image
              src="/hero/smartcloud.png"
              alt="Smart Cloud Logo"
              width={80}
              height={50}
              className="h-auto w-auto"
              priority
              fetchPriority="high"
            />
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
        </motion.div>
      </div>
    </motion.div>
  );
}
