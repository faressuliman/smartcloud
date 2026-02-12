import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { memo } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
}

const SectionHeader = memo(function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <motion.div
      className="mb-8 pb-4 lg:pb-8 border-b border-slate-200/60 px-2 md:px-4 lg:px-0 lg:mx-auto lg:max-w-6xl flex flex-col items-center gap-4 md:gap-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center gap-4 px-2 sm:px-0">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-800 uppercase tracking-widest">
          {title}
        </h2>
        <ArrowDownRight className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
      </div>

      {description && (
        <motion.div className="relative w-full bg-white/40 backdrop-blur-sm border-2 border-slate-200/50 rounded-3xl lg:rounded-4xl shadow-xl shadow-secondary/20 px-6 md:px-10 py-8 md:py-10">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm lg:text-base text-slate-600 leading-relaxed text-start"
          >
            {description}
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
});

export default SectionHeader;
