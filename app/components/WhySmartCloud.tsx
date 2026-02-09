"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { whySmartCloudData, sliderConfig } from "../data/contentData";
import { Zap } from "lucide-react";

export default function WhySmartCloud() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % whySmartCloudData.length);
        }, sliderConfig.whySmartCloudAutoPlayInterval);

        return () => clearInterval(interval);
    }, []);

    const currentStat = whySmartCloudData[currentIndex];
    const IconComponent = currentStat.icon;

    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="w-full px-4 lg:px-0 mt-16 sm:mt-24 mb-16 pb-16 border-b border-slate-200/60 flex flex-col items-center"
        >
            <div className="flex items-center gap-4 mb-8 px-2 sm:px-0">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-800 uppercase tracking-widest">
                    Why Choose Smart Cloud?
                </h2>
            </div>

            <div className="w-full max-w-6xl rounded-3xl lg:rounded-4xl shadow-xl shadow-slate-200/50 border-2 border-slate-200/50 overflow-hidden flex flex-col md:flex-row">
                <div className="flex-1 bg-secondary text-white p-8 md:p-10 relative overflow-hidden min-h-55 flex flex-col justify-center items-center text-center">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />

                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`icon-${currentIndex}`}
                                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                                    transition={{ duration: 0.6, ease: "backOut" }}
                                    className="absolute inset-0 flex items-center justify-center bg-white/25 rounded-full text-white"
                                >
                                    <IconComponent size={48} strokeWidth={1.5} />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <AnimatePresence mode="wait">
                                <motion.h3
                                    key={`count-${currentIndex}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-4xl md:text-5xl font-bold text-white tracking-tight"
                                >
                                    {currentStat.count}
                                </motion.h3>
                            </AnimatePresence>

                            <div className="w-16 h-1 bg-white/40 rounded-full my-2" />

                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={`title-${currentIndex}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="text-lg md:text-xl font-medium text-white/90 uppercase tracking-wide"
                                >
                                    {currentStat.title}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>

                    <motion.div
                        key={`progress-${currentIndex}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: sliderConfig.whySmartCloudAutoPlayInterval / 1000, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-1.5 bg-white/30"
                    />
                </div>

                {/* Right Section - Experience (Static) */}
                <motion.div
                    className="flex-1 bg-white p-8 md:p-10 relative overflow-hidden min-h-55 flex flex-col justify-center items-center text-center group"
                >
                    <div className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                        style={{ backgroundImage: "url(/about/smart-building-automation.jpg)" }} />

                    <div className="absolute inset-0 bg-linear-to-br from-white/90 to-transparent" />

                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="bg-secondary/10 p-4 rounded-full mb-2 group-hover:bg-secondary/20 transition-colors duration-300">
                            <Zap className="w-10 h-10 text-secondary" />
                        </div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex items-center justify-center gap-3"
                        >
                            <motion.h3 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="text-3xl font-bold text-secondary"
                            >
                                10+
                            </motion.h3>
                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="text-3xl font-bold text-secondary"
                            >
                                Years
                            </motion.span>
                        </motion.div>

                        <motion.h4 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="text-lg md:text-xl font-bold text-slate-700 uppercase tracking-wide"
                        >
                            Of Leading Experience
                        </motion.h4>

                        <motion.p 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-slate-500 text-sm md:text-base max-w-xs mx-auto mt-2"
                        >
                            Delivering excellence in smart automation and integrated systems since our inception.
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
