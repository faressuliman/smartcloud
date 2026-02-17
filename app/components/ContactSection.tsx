"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
//@ts-ignore
import ServiceRequestForm from "./ServiceRequestForm";
//@ts-ignore
import CareersForm from "./CareersForm";
import { useLanguage } from "../context/LanguageContext";

export default function ContactSection() {
  const [activeTab, setActiveTab] = useState<"service" | "careers">("service");
  const { language } = useLanguage();

  useEffect(() => {
    const handleSwitchToService = () => {
      setActiveTab("service");
    };

    window.addEventListener("switchToServiceTab" as any, handleSwitchToService);
    return () => {
      window.removeEventListener("switchToServiceTab" as any, handleSwitchToService);
    };
  }, []);

  const tabLabels = language === 'en' ? {
    requestService: "Request Service",
    careers: "Careers"
  } : {
    requestService: "طلب خدمة",
    careers: "وظائف"
  };

  return (
    <section id="contact-section" className="relative h-auto bg-linear-to-br from-slate-50 via-white to-slate-100 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-repeat-y opacity-15 z-0"
        style={{
          backgroundImage: "url(/common/cloud.jpg)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl sm:px-6 lg:px-8">
        {/* Tab Selector */}
        <div className="mb-8 sm:mb-10 md:mb-12 px-0">
          <div className="flex justify-center w-full">
            <div className="flex w-full rounded-none sm:rounded-lg border-2 border-primary/20 bg-white p-1 shadow-md">
              <button
                onClick={() => setActiveTab("service")}
                className={`relative flex-1 px-6 py-3 sm:px-8 sm:py-3.5 rounded-md font-semibold text-sm hover:cursor-pointer sm:text-base transition-all duration-300 ${
                  activeTab === "service"
                    ? "text-white"
                    : "text-slate-600 hover:text-[#1e3a5f]"
                }`}
              >
                {activeTab === "service" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-linear-to-r from-primary to-secondary rounded-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tabLabels.requestService}</span>
              </button>
              <button
                onClick={() => setActiveTab("careers")}
                className={`relative flex-1 px-6 py-3 sm:px-8 sm:py-3.5 rounded-md font-semibold text-sm sm:text-base hover:cursor-pointer transition-all duration-300 ${
                  activeTab === "careers"
                    ? "text-white"
                    : "text-slate-600 hover:text-[#1e3a5f]"
                }`}
              >
                {activeTab === "careers" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-linear-to-r from-primary to-secondary rounded-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tabLabels.careers}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="px-4 sm:px-0"
        >
          {activeTab === "service" ? <ServiceRequestForm /> : <CareersForm />}
        </motion.div>
      </div>
    </section>
  );
}
