"use client";

import { motion } from "framer-motion";
import { useCallback, memo } from "react";

interface RequestServiceButtonProps {
  className?: string;
  variant?: "mobile" | "desktop";
  delay?: number;
}

const RequestServiceButton = memo(function RequestServiceButton({ 
  className = "", 
  variant = "desktop",
  delay = 1 
}: RequestServiceButtonProps) {
  const scrollToContact = useCallback(() => {
    // Dispatch event to switch to service tab
    window.dispatchEvent(new CustomEvent('switchToServiceTab'));
    
    // Scroll to contact section
    setTimeout(() => {
      const contactSection = document.querySelector('#contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, []);

  const baseClasses = "w-full rounded-xl font-semibold text-white transition-all duration-300 bg-primary cursor-pointer";
  const mobileClasses = variant === "mobile" ? "py-3.5 hover:bg-primary-dark" : "";
  const desktopClasses = variant === "desktop" ? "py-4 hover:scale-[1.02] active:scale-[0.98] hover:bg-primary-dark" : "";

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={scrollToContact}
      className={`${baseClasses} ${mobileClasses} ${desktopClasses} ${className}`}
    >
      Request Service
    </motion.button>
  );
});

export default RequestServiceButton;
