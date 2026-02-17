"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Eye, Heart, ArrowDownRight, ArrowDownLeft } from "lucide-react";
import CertificationsSlideshow from "./CertificationsSlideshow";
import { content } from "../data/contentData";
import { useLanguage } from "../context/LanguageContext";

export default function AboutSection() {
    const { language } = useLanguage();
    const aboutData = content[language].about;
    const mission = aboutData.content.mission;
    const vision = aboutData.content.vision;
    const values = aboutData.content.values;

    const description = language === 'en' 
        ? "Smart Cloud specializes in intelligent solutions and integrated systems for hotels, homes, offices, corporate, and government sectors. We transform environments into smart, safe, and easily controllable spaces."
        : "تتخصص السحابة الذكية في الحلول الذكية والأنظمة المتكاملة للفنادق والمنازل والمكاتب والشركات والقطاعات الحكومية. نحن نحول البيئات إلى مساحات ذكية وآمنة وسهلة التحكم.";

    return (
        <div className="mx-auto max-w-6xl w-full">
            <motion.div
                className="mb-4 pb-12 sm:pb-16 md:pb-20 lg:pb-24 lg:pt-8 px-2 md:px-4 lg:px-0 lg:mx-auto lg:max-w-6xl flex flex-col items-center gap-4 md:gap-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="flex items-center gap-4 px-2 sm:px-0">
                    <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-800 uppercase tracking-widest">
                        {aboutData.subtitle}
                    </h2>
                    {language === 'en' ? (
                      <ArrowDownRight className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
                    ) : (
                      <ArrowDownLeft className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0 transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1" />
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
                        className="text-sm lg:text-base text-slate-700 leading-relaxed text-start"
                    >
                        {description}
                    </motion.p>
                </motion.div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start pb-12 sm:pb-16 md:pb-20 lg:pb-24">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="absolute rtl:right-4 rtl:sm:right-6 left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-slate-200" />

                    <div className="space-y-8">
                        <div className="relative pl-12 sm:pl-16 rtl:pr-12 rtl:sm:pr-16 z-10">
                            <div className="absolute left-0 rtl:right-0 top-1 w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-secondary bg-secondary shadow-lg shadow-secondary/50 flex items-center justify-center shrink-0 animate-pulse-circle z-20">
                                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                            </div>
                            <div className="bg-white rounded-lg p-5 sm:p-6 md:p-7 shadow-lg border-2 border-primary/30 max-w-md">
                                <motion.span 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold mb-3"
                                >
                                    {mission.title}
                                </motion.span>
                                <motion.p 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="text-sm sm:text-base text-slate-700 leading-relaxed"
                                >
                                    {mission.text}
                                </motion.p>
                            </div>
                        </div>

                        <div className="relative pl-12 sm:pl-16 rtl:pr-12 rtl:sm:pr-16 z-10">
                            <div className="absolute left-0 rtl:right-0 top-1 w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-secondary bg-secondary shadow-lg shadow-secondary/50 flex items-center justify-center shrink-0 animate-pulse-circle z-20">
                                <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                            </div>
                            <div className="bg-white rounded-lg p-5 sm:p-6 md:p-7 shadow-lg border-2 border-primary/30 max-w-md">
                                <motion.span 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold mb-3"
                                >
                                    {vision.title}
                                </motion.span>
                                <motion.p 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="text-sm sm:text-base text-slate-700 leading-relaxed"
                                >
                                    {vision.text}
                                </motion.p>
                            </div>
                        </div>

                        <div className="relative pl-12 sm:pl-16 rtl:pr-12 rtl:sm:pr-16 z-10">
                            <div className="absolute left-0 rtl:right-0 top-1 w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-secondary bg-secondary shadow-lg shadow-secondary/50 flex items-center justify-center shrink-0 animate-pulse-circle z-20">
                                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-white fill-white" />
                            </div>
                            <div className="bg-white rounded-lg p-5 sm:p-6 md:p-7 shadow-lg border-2 border-primary/30 max-w-md">
                                <motion.span 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold mb-3"
                                >
                                    {values.title}
                                </motion.span>
                                <motion.p 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="text-sm sm:text-base text-slate-700 leading-relaxed"
                                >
                                    {values.text}
                                </motion.p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src="/about/smart-building-automation.jpg"
                            alt="Smart Building Automation"
                            width={500}
                            height={600}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </motion.div>
            </div>

            <CertificationsSlideshow />
        </div>
    );
}
