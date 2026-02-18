"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight, ArrowDownLeft } from "lucide-react";
import ServiceCard from "./ui/ServiceCard";
import { content } from "../data/contentData";
import { useLanguage } from "../context/LanguageContext";

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();

  const services = content[language].services;
  const currentService = services[currentIndex];

  const nextService = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  }, [services.length]);

  const prevService = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  }, [services.length]);

  const goToService = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div className="mx-auto max-w-6xl w-full pb-6 md:pb-10 lg:pb-16">
        <motion.div
          className="mb-8 pb-4 lg:pb-8 lg:pt-8 border-b border-slate-200/60 px-2 md:px-4 lg:px-0 lg:mx-auto lg:max-w-6xl flex flex-col items-center gap-4 md:gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 px-2 sm:px-0">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-800 uppercase tracking-widest rtl:tracking-normal">
              {language === 'en' ? 'Our Services' : 'خدماتنا'}
            </h2>
            {language === 'en' ? (
              <ArrowDownRight className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
            ) : (
              <ArrowDownLeft className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
            )}
          </div>

          <motion.div
            className="relative w-full bg-white/40 backdrop-blur-sm border-2 border-slate-200/50 rounded-3xl lg:rounded-4xl shadow-xl shadow-secondary/20 px-6 md:px-10 py-8 md:py-10"
          >
            <p className="text-sm lg:text-base text-slate-600 leading-relaxed text-start">
              {language === 'en'
                ? 'From smart mosque automation to cutting-edge IoT solutions, we deliver comprehensive technical services across six specialized domains. Each service is designed to enhance efficiency, reduce costs, and bring intelligent automation to your facilities.'
                : 'من أتمتة المساجد الذكية إلى حلول إنترنت الأشياء المتطورة، نقدم خدمات فنية شاملة عبر ستة مجالات متخصصة. تم تصميم كل خدمة لتعزيز الكفاءة وتقليل التكاليف وجلب الأتمتة الذكية لمرافقك.'}
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="relative px-2 sm:px-4 lg:px-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row h-175 relative">
              <AnimatePresence mode="sync" initial={false}>
                <ServiceCard
                  key={currentIndex}
                  service={currentService}
                  currentIndex={currentIndex}
                  onPrev={prevService}
                  onNext={nextService}
                  language={language}
                />
              </AnimatePresence>
            </div>
          </div>

          <motion.div 
            className="flex justify-center gap-2 mt-6 lg:mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToService(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? 'bg-primary w-6 h-2 sm:w-7 sm:h-2.5 lg:w-8'
                    : 'bg-white w-2 h-2 sm:w-2.5 sm:h-2.5 hover:bg-slate-100'
                }`}
                aria-label={`Go to service ${idx + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>
    </div>
  );
}
