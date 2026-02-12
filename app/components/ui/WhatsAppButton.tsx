"use client";

import { motion } from "framer-motion";
import { useEffect, useState, memo } from "react";

const WhatsAppButton = memo(function WhatsAppButton() {
  const phoneNumber = "+966 59 485 6028";
  const message = "Hello, I'm interested in your smart cloud solutions.";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleLoadingComplete = () => {
      setIsLoadingComplete(true);
    };

    if (typeof window !== "undefined") {
      // Check if loading is already complete
      window.addEventListener("loadingComplete", handleLoadingComplete);
      
      // If page is already loaded, show button immediately
      if (document.readyState === "complete") {
        // Wait a bit to ensure loading screen has time to show
        setTimeout(() => {
          setIsLoadingComplete(true);
        }, 1200);
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("loadingComplete", handleLoadingComplete);
      }
    };
  }, []);

  // Check if device is mobile/tablet
  useEffect(() => {
    const checkMobileSize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 1024); // lg breakpoint is 1024px
      }
    };

    checkMobileSize();
    window.addEventListener("resize", checkMobileSize);

    return () => {
      window.removeEventListener("resize", checkMobileSize);
    };
  }, []);

  // Track navbar visibility through scroll (only on mobile/tablet)
  useEffect(() => {
    if (!isMobile) return;

    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY;

      // If scrolling up and has scrolled more than 100px, show nav
      if (scrollingUp && currentScrollY > 100) {
        setIsNavVisible(true);
      }
      // If scrolling down or near top, hide nav immediately
      else if (currentScrollY < 100 || !scrollingUp) {
        setIsNavVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isMobile]);

  if (!isLoadingComplete) return null;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed left-4 z-[9999] flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-lg transition-all hover:shadow-xl sm:left-6 sm:h-14 sm:w-14 cursor-pointer"
      style={{
        bottom: isMobile ? "84px" : (isNavVisible ? "100px" : "24px"),
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-green-500"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 0, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      {/* WhatsApp Icon SVG */}
      <svg
        className="relative z-10 h-7 w-7 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </motion.a>
  );
});

export default WhatsAppButton;
