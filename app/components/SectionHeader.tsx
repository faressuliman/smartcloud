"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface SectionHeaderProps {
    title: string;
    description: string;
}

export default function SectionHeader({ title, description, showLearnMore = true, learnMoreLink = "#about" }: SectionHeaderProps & { showLearnMore?: boolean, learnMoreLink?: string }) {
    // Split title for dual-tone or gradient effect if needed, taking the first word vs rest
    const titleWords = title.split(" ");
    const firstWord = titleWords[0];
    const restOfTitle = titleWords.slice(1).join(" ");

    return (
        <div className="relative w-full py-6 md:py-10 mb-6 md:mb-10 overflow-hidden">
            {/* Background Decorative Elements */}
            {/* Pattern */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: "url(/common/smallbg.png)",
                    backgroundSize: "400px",
                    backgroundRepeat: "repeat"
                }}
            />

            {/* Gradient Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-12">

                    {/* Left: Premium Title Group */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="relative flex-1 max-w-2xl"
                    >
                        {/* Floating Accent */}
                        <div className="absolute -top-10 left-0 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-100 shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-secondary" />
                            <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase">Smart Cloud Solutions</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mt-2">
                            <span className="text-slate-900 block">{firstWord}</span>
                            <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-blue-600 to-secondary">
                                {restOfTitle}
                            </span>
                        </h2>

                        {/* Decorative Line */}
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "80px" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="h-1.5 mt-4 bg-linear-to-r from-secondary to-transparent rounded-full"
                        />
                    </motion.div>

                    {/* Right: Glassmorphic Description Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="flex-1 w-full lg:max-w-xl"
                    >
                        <div className="group relative p-5 md:p-7 rounded-3xl bg-white/60 backdrop-blur-md border border-white/50 shadow-xl hover:shadow-2xl hover:bg-white/80 transition-all duration-500">
                            {/* Card Glow */}
                            <div className="absolute -inset-0.5 bg-linear-to-br from-primary/20 to-secondary/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />

                            <div className="flex flex-col gap-3">
                                <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                                    {description}
                                </p>

                                {showLearnMore && (
                                    <a href={learnMoreLink} className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider group/link cursor-pointer w-fit decoration-0">
                                        <span>Learn more</span>
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
