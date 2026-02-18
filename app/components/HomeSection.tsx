"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowDownLeft, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import HomeFeatureCard from "./ui/HomeFeatureCard";
import WhySmartCloud from "./WhySmartCloud";
import { sliderConfig, content } from "../data/contentData";
import { useLanguage } from "../context/LanguageContext";

interface HomeSectionProps {
    isNavigated: boolean;
}

export default function HomeSection({ isNavigated }: HomeSectionProps) {
    const [homeCardIndex, setHomeCardIndex] = useState(0);
    const [featureSlideIndex, setFeatureSlideIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const homeCardIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const { language } = useLanguage();
    const currentContent = content[language];
    const homeFeatures = currentContent.homeFeatures;

    const sections = language === 'en' ? {
        welcomeTitle: "Welcome to Smart Cloud",
        whatWeDoTitle: "What We Can Do For You",
        welcomeDesc: "Smart Cloud is a leading provider of intelligent technology solutions, specializing in smart automation, ELV systems, and marine technical supplies. With years of expertise, we ensure the highest standards of quality and reliability for all your technology needs."
    } : {
        welcomeTitle: "مرحباً بكم في السحابة الذكية",
        whatWeDoTitle: "ما يمكننا فعله لك",
        welcomeDesc: "السحابة الذكية هي شركة رائدة في تقديم حلول التكنولوجيا الذكية، متخصصة في الأتمتة الذكية، وأنظمة الجهد المنخفض، والتوريدات الفنية البحرية. بفضل سنوات من الخبرة، نضمن أعلى معايير الجودة والموثوقية لجميع احتياجاتك التقنية."
    };

    useEffect(() => {
        if (homeCardIntervalRef.current) {
            clearInterval(homeCardIntervalRef.current);
        }
        homeCardIntervalRef.current = setInterval(() => {
            setHomeCardIndex((prev) => (prev + 1) % 6);
        }, sliderConfig.homeCardsAutoPlayInterval);
        return () => {
            if (homeCardIntervalRef.current) {
                clearInterval(homeCardIntervalRef.current);
            }
        };
    }, []);

    const handleHomeCardChange = useCallback((index: number) => {
        setHomeCardIndex(index);
        if (homeCardIntervalRef.current) {
            clearInterval(homeCardIntervalRef.current);
        }
        homeCardIntervalRef.current = setInterval(() => {
            setHomeCardIndex((current) => (current + 1) % 6);
        }, sliderConfig.homeCardsAutoPlayInterval);
    }, []);

    const handleTouchStart = useCallback((e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX), []);
    const handleTouchMove = useCallback((e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX), []);
    const handleTouchEnd = useCallback(() => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isRTL = language === 'ar';
        // For RTL, swap next and prev directions
        if (isRTL) {
            if (distance > -50) handleHomeCardChange((homeCardIndex - 1 + 6) % 6);
            if (distance < 50) handleHomeCardChange((homeCardIndex + 1 + 6) % 6);
        } else {
            if (distance > 50) handleHomeCardChange((homeCardIndex + 1 + 6) % 6);
            if (distance < -50) handleHomeCardChange((homeCardIndex - 1 + 6) % 6);
        }
    }, [touchStart, touchEnd, homeCardIndex, handleHomeCardChange, language]);

    return (
        <div className="mx-auto max-w-6xl w-full">
            <motion.div
                className="mb-4 pb-12 sm:pb-16 md:pb-20 lg:pb-24 lg:pt-8 border-b border-slate-200/60 px-2 md:px-4 lg:px-0 lg:mx-auto lg:max-w-6xl flex flex-col items-center gap-4 md:gap-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="flex items-center gap-4 px-2 sm:px-0">
                    <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-800 uppercase tracking-widest rtl:tracking-normal">
                        {sections.welcomeTitle}
                    </h2>
                    <ArrowDownRight className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1 rtl:rotate-90" />
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
                        {sections.welcomeDesc}
                    </motion.p>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4 }}
                className="pb-16 md:pb-20 lg:pb-26"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="pb-4 border-b border-slate-200/60 px-4 md:px-4 lg:px-0 flex items-center gap-4"
                >
                    <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-800 uppercase tracking-widest rtl:tracking-normal">
                        {sections.whatWeDoTitle}
                    </h2>
                    {language === 'en' ? (
                      <ArrowDownRight className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
                    ) : (
                      <ArrowDownLeft className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0 transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1" />
                    )}
                </motion.div>

                <div className="relative md:px-4 lg:px-0">
                    <div className="hidden md:flex items-center justify-between mb-8 relative z-10">
                        <div className="flex gap-1">
                            <button
                                onClick={() => setFeatureSlideIndex(0)}
                                className={`rounded-full transition-all duration-300 ${featureSlideIndex === 0 ? "w-8 h-3 bg-primary" : "w-3 h-3 bg-slate-300 hover:bg-slate-400"}`}
                                aria-label="Go to slide 1"
                            />
                            <button
                                onClick={() => setFeatureSlideIndex(1)}
                                className={`rounded-full transition-all duration-300 ${featureSlideIndex === 1 ? "w-8 h-3 bg-primary" : "w-3 h-3 bg-slate-300 hover:bg-slate-400"}`}
                                aria-label="Go to slide 2"
                            />
                        </div>

                        <button
                            onClick={() => setFeatureSlideIndex((prev) => (prev === 0 ? 1 : 0))}
                            className="w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center transition-colors shadow-lg cursor-pointer"
                            aria-label="Toggle slide"
                        >
                            <ArrowRight className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    <div className="hidden md:block overflow-hidden py-4 -my-4">
                        <motion.div
                            className="flex"
                            dir="ltr"
                            animate={{ x: featureSlideIndex === 0 ? "0%" : (language === 'ar' ? "50%" : "-50%") }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            style={{ width: "200%" }}
                        >
                            <div className="grid grid-cols-3 gap-4 lg:gap-8 w-1/2">
                                {homeFeatures.slice(0, 3).map((item, index) => (
                                    <HomeFeatureCard
                                        key={index}
                                        icon={item.icon}
                                        title={item.title}
                                        description={item.desc}
                                        animationDelay={index * 0.1}
                                    />
                                ))}
                            </div>
                            <div className="grid grid-cols-3 gap-4 lg:gap-8 w-1/2">
                                {homeFeatures.slice(3, 6).map((item, index) => (
                                    <HomeFeatureCard
                                        key={index + 3}
                                        icon={item.icon}
                                        title={item.title}
                                        description={item.desc}
                                        animationDelay={index * 0.1}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div
                        className="md:hidden relative overflow-hidden py-4 -my-4"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            dir="ltr"
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: language === 'ar'
                                ? `translateX(-${(homeFeatures.length - 1 - homeCardIndex) * 100}%)`
                                : `translateX(-${homeCardIndex * 100}%)`
                            }}
                        >
                            {(language === 'ar' ? [...homeFeatures].reverse() : homeFeatures).map((item, index) => (
                                <HomeFeatureCard
                                    key={index}
                                    icon={item.icon}
                                    title={item.title}
                                    description={item.desc}
                                    isMobile={true}
                                    currentIndex={homeCardIndex}
                                    totalCards={6}
                                    onDotClick={handleHomeCardChange}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            <WhySmartCloud />
        </div>
    );
}
