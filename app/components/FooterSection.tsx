"use client";

import { motion } from "framer-motion";
import { Lightbulb, Sparkles, Phone, Mail, MapPin, Clock, Cloud } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { content } from "../data/contentData";

export default function FooterSection() {
  const { language } = useLanguage();
  const footerData = content[language].footer;
  const servicesData = content[language].services;
  
  const relevantServiceIds = [
    "smart-mosques",
    "energy-solar",
    "audio-visual",
    "smart-buildings-iot"
  ];

  const displayedServices = relevantServiceIds.map(id => {
    const service = servicesData.find(s => s.id === id);
    return service ? service.title : "";
  }).filter(Boolean);

  const supportService = language === 'en' ? "Support & Maintenance" : "الدعم والصيانة";
  displayedServices.push(supportService);

  const texts = language === 'en' ? {
    companyName: "Smart Cloud",
    description: "Transforming spaces into intelligent, safe, and easy-to-control environments through innovative smart solutions. Your happiness is our success.",
    servicesTitle: "Services",
    contactTitle: "Contact",
    businessHoursTitle: "Business Hours:",
    businessHours: "Saturday to Thursday:",
    businessTime: "9:00 AM - 6:00 PM",
    closed: "Friday: Closed",
    rights: "© " + new Date().getFullYear() + " Smart Cloud. All rights reserved."
  } : {
    companyName: "السحابة الذكية",
    description: "تحويل المساحات إلى بيئات ذكية وآمنة وسهلة التحكم من خلال حلول ذكية مبتكرة. سعادتكم هي نجاحنا.",
    servicesTitle: "خدماتنا",
    contactTitle: "تواصل معنا",
    businessHoursTitle: "ساعات العمل:",
    businessHours: "السبت إلى الخميس:",
    businessTime: "9:00 صباحاً - 6:00 مساءً",
    closed: "الجمعة: مغلق",
    rights: "© " + new Date().getFullYear() + " السحابة الذكية. جميع الحقوق محفوظة."
  };

  return (
    <section className="relative flex snap-start items-center justify-center bg-linear-to-b from-slate-50 to-blue-50 pt-8 pb-12 md:pt-8 md:pb-12 border-t border-secondary/20" style={{ isolation: "isolate", zIndex: 1 }}>
      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(rgba(229, 184, 56, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(229, 184, 56, 0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating Background Icons */}
      <motion.div
        className="absolute left-10 top-20 text-secondary/10 rtl:right-10 rtl:left-auto"
        animate={{
          rotate: [0, 360],
          y: [0, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Lightbulb size={200} />
      </motion.div>
      <motion.div
        className="absolute right-10 bottom-20 text-secondary/10 rtl:left-10 rtl:right-auto"
        animate={{
          rotate: [360, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles size={180} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 pt-4 sm:pt-4 md:pt-6 pb-6 sm:pb-8 md:pb-12">
        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-3">
          {/* Column 1 - Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-3 sm:mb-3 md:mb-4 flex items-center gap-3">
              <div className="rounded-full bg-secondary p-2">
                <Cloud className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-xl font-bold text-slate-900">{texts.companyName}</h3>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed text-start">
              {texts.description}
            </p>
          </motion.div>

          {/* Column 2 - Services (Centered on desktop, left on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="sm:flex sm:justify-center"
          >
            <div>
              <h4 className="mb-3 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-lg font-semibold text-slate-900 text-start">{texts.servicesTitle}</h4>
              <ul className="space-y-1.5 sm:space-y-1.5 md:space-y-2 text-start">
                {displayedServices.map((service, idx) => (
                  <li key={idx}>
                    <span className="text-xs sm:text-sm md:text-base text-slate-600">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Column 3 - Contact (Aligned to end on desktop, left on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sm:flex sm:justify-end"
          >
            <div>
              <h4 className="mb-3 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-lg font-semibold text-slate-900 text-start">{texts.contactTitle}</h4>
              <ul className="space-y-2 sm:space-y-2 md:space-y-3">
                <li className="flex items-center gap-3 text-xs sm:text-sm md:text-base text-slate-600">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-secondary rtl:-scale-x-100" />
                  <span dir="ltr">+966 59 485 6028</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm md:text-base text-slate-600">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-secondary" />
                  <span className="break-all">info@smartcloud.com</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm md:text-base text-slate-600">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-secondary" />
                  <span>{language === 'en' ? "Riyadh, Saudi Arabia" : "الرياض، المملكة العربية السعودية"}</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Business Hours */}
        <motion.div
          className="mt-6 sm:mt-8 md:mt-12 border-t border-secondary/30 pt-4 sm:pt-6 md:pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-2 md:gap-3 text-xs sm:text-sm md:text-base text-slate-600">
            <Clock className="h-4 w-4 sm:h-4 md:h-5 sm:w-4 md:w-5 shrink-0 text-secondary" />
            <span className="font-semibold">{texts.businessHoursTitle}</span>
            <span>{texts.businessHours}</span>
            <span>{texts.businessTime}</span>
            <span className="whitespace-nowrap">{texts.closed}</span>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="mt-4 sm:mt-6 md:mt-8 flex flex-col items-start sm:items-start justify-between gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-xs sm:text-sm md:text-base text-slate-600 w-full text-start">
            {texts.rights}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
