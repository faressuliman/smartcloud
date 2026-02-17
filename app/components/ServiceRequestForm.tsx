"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowDownRight, ArrowDownLeft, ChevronDown, Info } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { z } from "zod";
import { serviceRequestSchema } from "../validation/service-request";
import { useLanguage } from "../context/LanguageContext";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  serviceCategory: "" | "design-consulting" | "price-quote" | "other";
  buildingType?: string;
  numberOfRooms?: string;
  numberOfLightingCircuits?: string;
  numberOfAirConditioningUnits?: string;
  numberOfBlinds?: string;
  numberOfFloors?: string;
  numberOfRestrooms?: string;
  numberOfCorridors?: string;
  numberOfExteriorDoors?: string;
  numberOfExteriorCameras?: string;
  numberOfInteriorCameras?: string;
  numberOfAudioSystems?: string;
  requirements?: string;
};

export default function ServiceRequestForm() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    serviceCategory: "",
  });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = language === 'en' ? {
    header: "Request Service",
    desc: "Tell us about your smart building project and we'll provide tailored solutions for your needs.",
    successTitle: "Thank you!",
    successMsg: "We'll get back to you soon.",
    fullName: "Full Name",
    phone: "Phone Number",
    email: "Email Address",
    serviceCategory: "Service Category",
    selectService: "Select a service",
    designConsulting: "Requesting system design or consulting services",
    priceQuote: "Request for a price quote for smart building systems",
    other: "Request other services",
    buildingType: "Building Type",
    selectBuildingType: "Select building type",
    adminBuildings: "Administrative Buildings",
    offices: "Offices",
    villasApts: "Villas and Apartments",
    residentialComplex: "Residential Complex",
    hotels: "Hotels",
    palaces: "Palaces",
    mosques: "Mosques",
    numRooms: "Number of Rooms",
    numLightCircuits: "Number of Lighting Circuits",
    numACUnits: "Number of Air Conditioning Units",
    numBlinds: "Number of Blinds/Curtains",
    numFloors: "Number of Floors",
    numRestrooms: "Number of Restrooms",
    numCorridors: "Number of Corridors",
    numExtDoors: "Number of Exterior Doors",
    numExtCams: "Number of Exterior Cameras",
    numIntCams: "Number of Interior Cameras",
    numAudio: "Number of Audio Systems",
    requirements: "Additional Requirements / Project Details",
    submit: "Submit Request",
    submitting: "Submitting...",
    errors: {
      submitFail: "Failed to submit. Please try again."
    }
  } : {
    header: "طلب خدمة",
    desc: "أخبرنا عن مشروع المبنى الذكي الخاص بك وسنقدم حلولاً مخصصة لاحتياجاتك.",
    successTitle: "شكراً لك!",
    successMsg: "سنتواصل معك قريباً.",
    fullName: "الاسم الكامل",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    serviceCategory: "فئة الخدمة",
    selectService: "اختر خدمة",
    designConsulting: "طلب تصميم نظام أو خدمات استشارية",
    priceQuote: "طلب عرض سعر لأنظمة المباني الذكية",
    other: "طلب خدمات أخرى",
    buildingType: "نوع المبنى",
    selectBuildingType: "اختر نوع المبنى",
    adminBuildings: "مباني إدارية",
    offices: "مكاتب",
    villasApts: "فلل وشقق",
    residentialComplex: "مجمع سكني",
    hotels: "فنادق",
    palaces: "قصور",
    mosques: "مساجد",
    numRooms: "عدد الغرف",
    numLightCircuits: "عدد دوائر الإضاءة",
    numACUnits: "عدد وحدات التكييف",
    numBlinds: "عدد الستائر",
    numFloors: "عدد الطوابق",
    numRestrooms: "عدد دورات المياه",
    numCorridors: "عدد الممرات",
    numExtDoors: "عدد الأبواب الخارجية",
    numExtCams: "عدد الكاميرات الخارجية",
    numIntCams: "عدد الكاميرات الداخلية",
    numAudio: "عدد الأنظمة الصوتية",
    requirements: "متطلبات إضافية / تفاصيل المشروع",
    submit: "إرسال الطلب",
    submitting: "جاري الإرسال...",
    errors: {
      submitFail: "فشل الإرسال. يرجى المحاولة مرة أخرى."
    }
  };

  const inputClass = useMemo(() => 
    "w-full rounded-lg border-2 border-transparent bg-slate-50/80 px-4 py-3 text-[#1e3a5f] transition-all duration-200 ease-out focus:border-primary focus:bg-white focus:shadow-md focus:outline-none placeholder:text-slate-400"
  , []);
  
  const selectClass = useMemo(() => 
    "w-full rounded-lg border-2 border-transparent bg-slate-50/80 pl-4 pr-10 rtl:pr-4 rtl:pl-10 py-3 text-[#1e3a5f] transition-all duration-200 ease-out focus:border-primary focus:bg-white focus:shadow-md focus:outline-none appearance-none cursor-pointer"
  , []);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === "serviceCategory") {
      setFormData((prev) => ({
        fullName: prev.fullName,
        email: prev.email,
        phone: prev.phone,
        serviceCategory: value as FormData["serviceCategory"],
      }));
      setErrors({});
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => {
        if (prev[name]) {
          const { [name]: removed, ...rest } = prev;
          return rest;
        }
        return prev;
      });
    }
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validated = serviceRequestSchema.parse(formData);
      setIsSubmitting(true);

      const response = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || t.errors.submitFail);
      }

      setIsSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        serviceCategory: "",
      });

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<string, string>> = {};
        error.issues.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        const errorMessage = error instanceof Error ? error.message : t.errors.submitFail;
        setErrors({ serviceCategory: errorMessage });
        console.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, t.errors.submitFail]);

  return (
    <motion.div
      className="mx-auto max-w-6xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-800 uppercase tracking-widest"
          >
            {t.header}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {language === 'en' ? (
              <ArrowDownRight className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
            ) : (
              <ArrowDownLeft className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
            )}
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed text-start"
        >
          {t.desc}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {isSuccess ? (
          <motion.div
            className="flex flex-col items-center justify-center rounded-2xl bg-linear-to-br from-emerald-50 to-green-50 border-2 border-emerald-200/50 p-12 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="mb-4 h-16 w-16 text-emerald-500" />
            <p className="text-xl font-semibold text-[#1e3a5f] mb-2">{t.successTitle}</p>
            <p className="text-slate-600">{t.successMsg}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name & Phone */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`${inputClass} text-xs sm:text-base text-start`}
                  placeholder={t.fullName}
                />
                {errors.fullName && (
                  <p className="mt-1 flex items-center gap-1 text-xs sm:text-base text-red-500">
                    <Info className="w-3 h-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`${inputClass} text-xs sm:text-base text-start`}
                  placeholder={t.phone}
                />
                {errors.phone && (
                  <p className="mt-1 flex items-center gap-1 text-xs sm:text-base text-red-500">
                    <Info className="w-3 h-3" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${inputClass} text-xs sm:text-base text-start`}
                placeholder={t.email}
              />
              {errors.email && (
                <p className="mt-1 flex items-center gap-1 text-xs sm:text-base text-red-500">
                  <Info className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Service Category */}
            <div>
              <label htmlFor="serviceCategory" className="block mb-2 text-sm font-medium text-[#1e3a5f] text-start">{t.serviceCategory}</label>
              <div className="relative">
                <select
                  id="serviceCategory"
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  onChange={handleChange}
                  className={`${selectClass} text-xs sm:text-base`}
                >
                  <option value="">{t.selectService}</option>
                  <option value="design-consulting">{t.designConsulting}</option>
                  <option value="price-quote">{t.priceQuote}</option>
                  <option value="other">{t.other}</option>
                </select>
                <ChevronDown className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1e3a5f] pointer-events-none" />
              </div>
              {errors.serviceCategory && (
                <p className="mt-1 flex items-center gap-1 text-xs sm:text-base text-red-500">
                  <Info className="w-3 h-3" />
                  {errors.serviceCategory}
                </p>
              )}
            </div>

            {/* Design/Consulting Fields */}
            {formData.serviceCategory === "design-consulting" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-[#1e3a5f] text-start">{t.buildingType}</label>
                  <select
                    name="buildingType"
                    value={formData.buildingType || ""}
                    onChange={handleChange}
                    className={`${selectClass} text-xs sm:text-base`}
                  >
                    <option value="">{t.selectBuildingType}</option>
                    <option value="administrative-buildings">{t.adminBuildings}</option>
                    <option value="offices">{t.offices}</option>
                    <option value="villas-apartments">{t.villasApts}</option>
                    <option value="residential-complex">{t.residentialComplex}</option>
                    <option value="hotels">{t.hotels}</option>
                    <option value="palaces">{t.palaces}</option>
                    <option value="mosques">{t.mosques}</option>
                  </select>
                  <ChevronDown className="absolute right-3 rtl:right-auto rtl:left-3 bottom-3 h-5 w-5 text-[#1e3a5f] pointer-events-none" />
                </div>
                {errors.buildingType && (
                  <p className="mt-1 flex items-center gap-1 text-xs sm:text-base text-red-500">
                    <Info className="w-3 h-3" />
                    {errors.buildingType}
                  </p>
                )}
                
                {/* Additional Inputs for Design Consulting */}
                <div className="grid gap-6 sm:grid-cols-2 mt-4">
                  {[
                    { name: "numberOfRooms", ph: t.numRooms },
                    { name: "numberOfLightingCircuits", ph: t.numLightCircuits },
                    { name: "numberOfAirConditioningUnits", ph: t.numACUnits },
                    { name: "numberOfBlinds", ph: t.numBlinds },
                    { name: "numberOfFloors", ph: t.numFloors },
                    { name: "numberOfRestrooms", ph: t.numRestrooms },
                    { name: "numberOfCorridors", ph: t.numCorridors },
                    { name: "numberOfExteriorDoors", ph: t.numExtDoors },
                    { name: "numberOfExteriorCameras", ph: t.numExtCams },
                    { name: "numberOfInteriorCameras", ph: t.numIntCams },
                    { name: "numberOfAudioSystems", ph: t.numAudio },
                  ].map((field) => (
                    <div key={field.name}>
                      <input
                        type="number"
                        name={field.name}
                        value={(formData as any)[field.name] || ""}
                        onChange={handleChange}
                        className={`${inputClass} text-xs sm:text-base text-start`}
                        placeholder={field.ph}
                        min="0"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Price Quote Fields - Reusing logic, or similar if needs differ */}
            {formData.serviceCategory === "price-quote" && (
             <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-[#1e3a5f] text-start">{t.buildingType}</label>
                  <select
                    name="buildingType"
                    value={formData.buildingType || ""}
                    onChange={handleChange}
                    className={`${selectClass} text-xs sm:text-base`}
                  >
                    <option value="">{t.selectBuildingType}</option>
                    <option value="administrative-buildings">{t.adminBuildings}</option>
                    <option value="offices">{t.offices}</option>
                    <option value="villas-apartments">{t.villasApts}</option>
                    <option value="residential-complex">{t.residentialComplex}</option>
                    <option value="hotels">{t.hotels}</option>
                    <option value="palaces">{t.palaces}</option>
                    <option value="mosques">{t.mosques}</option>
                  </select>
                  <ChevronDown className="absolute right-3 rtl:right-auto rtl:left-3 bottom-3 h-5 w-5 text-[#1e3a5f] pointer-events-none" />
                </div>
                 {/* Additional Inputs for Price Quote - usually similar quantities needed */}
                <div className="grid gap-6 sm:grid-cols-2 mt-4">
                  {[
                    { name: "numberOfRooms", ph: t.numRooms },
                    { name: "numberOfLightingCircuits", ph: t.numLightCircuits },
                    { name: "numberOfAirConditioningUnits", ph: t.numACUnits },
                    { name: "numberOfBlinds", ph: t.numBlinds },
                    { name: "numberOfFloors", ph: t.numFloors },
                    { name: "numberOfRestrooms", ph: t.numRestrooms },
                    { name: "numberOfCorridors", ph: t.numCorridors },
                    { name: "numberOfExteriorDoors", ph: t.numExtDoors },
                    { name: "numberOfExteriorCameras", ph: t.numExtCams },
                    { name: "numberOfInteriorCameras", ph: t.numIntCams },
                    { name: "numberOfAudioSystems", ph: t.numAudio },
                  ].map((field) => (
                    <div key={field.name}>
                      <input
                        type="number"
                        name={field.name}
                        value={(formData as any)[field.name] || ""}
                        onChange={handleChange}
                        className={`${inputClass} text-xs sm:text-base text-start`}
                        placeholder={field.ph}
                        min="0"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Requirements / Other */}
            <div>
              <label htmlFor="requirements" className="block mb-2 text-sm font-medium text-[#1e3a5f] text-start">{t.requirements}</label>
              <textarea
                name="requirements"
                rows={4}
                value={formData.requirements || ""}
                onChange={handleChange}
                className={`${inputClass} text-xs sm:text-base text-start`}
                placeholder={t.requirements}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-primary px-6 py-4 font-semibold text-white transition-all duration-200 hover:shadow-xl hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2"
              whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="mr-3 -ml-1 w-5 h-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-sm sm:text-base">{t.submitting}</span>
                </>
              ) : (
                <span className="text-sm sm:text-base">{t.submit}</span>
              )}
            </motion.button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
