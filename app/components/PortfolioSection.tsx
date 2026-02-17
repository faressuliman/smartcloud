"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowDownRight, ArrowDownLeft } from "lucide-react";
import PortfolioCard from "./ui/PortfolioCard";
import { useLanguage } from "../context/LanguageContext";
import { content } from "../data/contentData";

export default function PortfolioSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();
  
  const portfolio = content[language].portfolio;
  const currentPortfolio = portfolio[currentIndex];

  const nextPortfolio = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % portfolio.length);
  }, [portfolio.length]);

  const prevPortfolio = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + portfolio.length) % portfolio.length);
  }, [portfolio.length]);

  const goToPortfolio = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const headerTitle = language === 'en' ? "Our Portfolio" : "أعمالنا";
  const headerDesc = language === 'en'
    ? "Explore our successful projects and case studies showcasing our expertise in smart mosque automation, IoT solutions, and intelligent facility management. Each project demonstrates our commitment to delivering innovative technology solutions that transform operational efficiency and enhance user experiences."
    : "استكشف مشاريعنا الناجحة ودراسات الحالة التي تعرض خبرتنا في أتمتة المساجد الذكية وحلول إنترنت الأشياء وإدارة المرافق الذكية. يوضح كل مشروع التزامنا بتقديم حلول تقنية مبتكرة تحول الكفاءة التشغيلية وتعزز تجارب المستخدمين.";

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
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-800 uppercase tracking-widest">
              {headerTitle}
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
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm lg:text-base text-slate-600 leading-relaxed text-start"
            >
              {headerDesc}
            </motion.p>
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
              <AnimatePresence mode="wait" initial={false}>
                <PortfolioCard
                  key={`portfolio-${currentIndex}-${language}`}
                  portfolio={currentPortfolio}
                  currentIndex={currentIndex}
                  onPrev={prevPortfolio}
                  onNext={nextPortfolio}
                  language={language}
                />
              </AnimatePresence>
            </div>
          </div>
          
           {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6 lg:mt-8">
            {portfolio.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToPortfolio(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? "bg-primary w-6 h-2 sm:w-7 sm:h-2.5 lg:w-8"
                    : "bg-white w-2 h-2 sm:w-2.5 sm:h-2.5 hover:bg-slate-100"
                }`}
                aria-label={`Go to portfolio ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
    </div>
  );
}
