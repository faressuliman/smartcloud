"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export default function LocationSection() {
  return (
    <section className="relative flex snap-start items-center justify-center bg-slate-100 pt-12 pb-14 md:pt-12 md:pb-14 lg:min-h-screen" style={{ isolation: "isolate", zIndex: 1 }}>
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl"
        >
          <motion.div
            className="mb-8 px-2 md:px-4 lg:px-0 lg:mx-auto lg:max-w-6xl flex flex-col items-center gap-4 md:gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 px-2 sm:px-0">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-800 uppercase tracking-widest">
                Where You Can Find Us
              </h2>
              <ArrowDownRight className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
            </div>
          </motion.div>
          <motion.div
            className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-secondary-dark/30 shadow-2xl shadow-slate-900/10 bg-white"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ isolation: "isolate", position: "relative", zIndex: 0 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.910956294849!2d55.3439402!3d25.2062252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f673715fa2aa1%3A0xa7d29927e7988ee5!2sDubai%20Creek%20Residences%20North%20Tower%201!5e0!3m2!1sen!2seg!4v1769087548656!5m2!1sen!2seg"
              width="100%"
              height="400"
              style={{ border: 0, position: "relative", zIndex: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Smart Cloud Location - Dubai Creek Residence North Tower 1, Dubai Creek Harbor, Dubai, UAE"
              className="w-full sm:h-125 md:h-150"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
