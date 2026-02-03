"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import SectionIndicator from "./SectionIndicator";
import HomeSection from "./HomeSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import PortfolioSection from "./PortfolioSection";
import { navItems } from "../data/contentData";

export default function ContentSection() {
  const [activeSection, setActiveSection] = useState(0);
  const [isNavigated, setIsNavigated] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const isProgrammaticScrollRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  const navigateToSection = (index: number) => {
    setIsNavigated(true);
    setActiveSection(index);
    setIsNavVisible(true);
    isProgrammaticScrollRef.current = true;

    // Use requestAnimationFrame to ensure React state updates are scheduled
    // before the DOM scroll operation begins, preventing race conditions.
    requestAnimationFrame(() => {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth" });
      }

      // Reset the programmatic scroll lock after the smooth scroll finishes
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
        lastScrollYRef.current = window.scrollY;
      }, 1000);
    });
  };

  useEffect(() => {
    const handleShowAbout = () => navigateToSection(1);
    const handleShowHome = () => navigateToSection(0);

    window.addEventListener("showAbout" as any, handleShowAbout);
    window.addEventListener("showHome" as any, handleShowHome);

    // Track scroll for "Is Navigated" state reset
    let scrollTimeout: NodeJS.Timeout;
    const handleScrollReset = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3;
          if (isInView && !isNavigated) {
            setIsNavigated(false);
          }
        }
      }, 150);
    };

    window.addEventListener("scroll", handleScrollReset, { passive: true });

    return () => {
      window.removeEventListener("showAbout" as any, handleShowAbout);
      window.removeEventListener("showHome" as any, handleShowHome);
      window.removeEventListener("scroll", handleScrollReset);
      clearTimeout(scrollTimeout);
    };
  }, [isNavigated]);

  // Separate effect for scroll-to-hide logic
  useEffect(() => {
    const handleScrollDirection = () => {
      if (isProgrammaticScrollRef.current) return;

      const currentScrollY = window.scrollY;
      const prevScrollY = lastScrollYRef.current;

      const diff = Math.abs(currentScrollY - prevScrollY);

      if (diff > 5) {
        if (currentScrollY > prevScrollY && currentScrollY > 100) {
          setIsNavVisible(false);
        } else if (currentScrollY < prevScrollY) {
          setIsNavVisible(true);
        }
        lastScrollYRef.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScrollDirection, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollDirection);
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative flex flex-col justify-start bg-white pt-0 pb-24 md:pt-0 md:pb-12 lg:py-12 h-auto overflow-x-hidden" style={{ zIndex: 1 }}>
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 z-0"
          style={{
            backgroundImage: "url(/common/cloud-bg.png)",
          }}
        />

        {/* Section Indicator - Desktop */}
        <div className="hidden lg:block absolute right-4 z-50 lg:right-6" style={{ top: "50vh", transform: "translateY(-50%)" }}>
          <SectionIndicator activeSection={activeSection} onSectionChange={navigateToSection} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 pt-10 sm:pt-16 md:pt-12 lg:pt-0">

          {activeSection === 0 && <HomeSection isNavigated={isNavigated} />}

          {activeSection === 1 && <AboutSection />}

          {activeSection === 2 && <ServicesSection />}

          {activeSection === 3 && <PortfolioSection />}

        </div>
      </section>

      {/* Mobile & Tablet Navigation - Fixed Bottom (hide on desktop) */}
      <motion.div
        className="fixed bottom-0 left-0 w-full z-[1000] block lg:hidden"
        initial={{ y: 0 }}
        animate={{ y: isNavVisible ? 0 : 120 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="w-full bg-white border-t border-slate-200 shadow-[0_-8px_30px_rgba(0,0,0,0.15)]">
          <div className="flex w-full items-center justify-around px-2 py-3 pb-[max(16px,env(safe-area-inset-bottom,16px))]">
            {navItems.map((section, index) => {
              const Icon = section.icon;
              const isActive = activeSection === index;
              return (
                <motion.button
                  key={index}
                  onClick={() => navigateToSection(index)}
                  aria-label={`Navigate to ${section.name} section`}
                  aria-pressed={isActive}
                  className="relative flex flex-1 flex-col items-center justify-center gap-1 py-1 transition-all duration-300 cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Active Indicator Capsule */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-x-2 sm:inset-x-4 inset-y-0.5 rounded-2xl bg-primary"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  <div className="relative z-10 flex flex-col items-center">
                    <Icon
                      size={22}
                      className={`transition-colors duration-300 ${isActive ? "text-white" : "text-slate-500"}`}
                    />
                    <span className={`text-[10px] sm:text-xs font-semibold mt-0.5 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-600"}`}>
                      {section.name}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
}
