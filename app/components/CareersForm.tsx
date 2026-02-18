"use client";

import { motion } from "framer-motion";
import { CheckCircle, Upload, ArrowDownRight, ArrowDownLeft, Info } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { z } from "zod";
import { careersTextFieldsSchema, type CareersFormData } from "../validation/careers";
import { useLanguage } from "../context/LanguageContext";

export default function CareersForm() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<CareersFormData>({
    fullName: "",
    email: "",
    phone: "",
    cv: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CareersFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = language === 'en' ? {
    header: "Join Our Team",
    desc: "We're looking for talented professionals passionate about smart technology and innovation. Submit your application to join our growing team.",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    cvLabel: "Upload CV / Resume *",
    clickToUpload: "Click to upload or drag and drop",
    fileTypes: "PDF, DOC, DOCX (MAX. 10MB)",
    submit: "Submit Application",
    submitting: "Submitting...",
    successTitle: "Thank you!",
    successMsg: "We'll review your application soon.",
    errors: {
      cvRequired: "CV/Resume is required",
      submitFail: "Failed to submit. Please try again."
    },
    validation: {
      fullNameRequired: "Full Name must be at least 4 characters",
      emailRequired: "Email is required",
      emailInvalid: "Invalid email address",
      phoneRequired: "Phone is required",
      phoneMin: "Phone number must be at least 10 digits",
    }
  } : {
    header: "انضم إلى فريقنا",
    desc: "نحن نبحث عن محترفين موهوبين شغوفين بالتكنولوجيا الذكية والابتكار. قدم طلبك للانضمام إلى فريقنا المتنامي.",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    cvLabel: "تحميل السيرة الذاتية *",
    clickToUpload: "اضغط للتحميل أو اسحب وأفلت",
    fileTypes: "PDF, DOC, DOCX (حد أقصى 10 ميجابايت)",
    submit: "إرسال الطلب",
    submitting: "جاري الإرسال...",
    successTitle: "شكراً لك!",
    successMsg: "سنراجع طلبك قريباً.",
    errors: {
      cvRequired: "السيرة الذاتية مطلوبة",
      submitFail: "فشل الإرسال. يرجى المحاولة مرة أخرى."
    },
    validation: {
      fullNameRequired: "الاسم الكامل يجب أن يكون 4 أحرف على الأقل",
      emailRequired: "البريد الإلكتروني مطلوب",
      emailInvalid: "عنوان بريد إلكتروني غير صالح",
      phoneRequired: "رقم الهاتف مطلوب",
      phoneMin: "رقم الهاتف يجب أن يكون 10 أرقام على الأقل",
    }
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (prev[name as keyof CareersFormData]) {
        const { [name as keyof CareersFormData]: removed, ...rest } = prev;
        return rest;
      }
      return prev;
    });
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, cv: file }));
      setErrors((prev) => {
        if (prev.cv) {
          const { cv, ...rest } = prev;
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
      // Validate text fields
      const textFieldsValidated = careersTextFieldsSchema.parse({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      });

      // Check CV
      if (!formData.cv) {
        setErrors({ cv: t.errors.cvRequired });
        return;
      }

      const validated = {
        ...textFieldsValidated,
        cv: formData.cv,
      };

      setIsSubmitting(true);

      const formDataToSend = new FormData();
      formDataToSend.append("fullName", validated.fullName);
      formDataToSend.append("email", validated.email);
      formDataToSend.append("phone", validated.phone);
      formDataToSend.append("cv", validated.cv);

      const response = await fetch("/api/careers", {
        method: "POST",
        body: formDataToSend,
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
        cv: null,
      });

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof CareersFormData, string>> = {};
        const fieldValidationMap: Record<string, string> = {
          fullName: t.validation.fullNameRequired,
          email: t.validation.emailRequired,
          phone: t.validation.phoneRequired,
        };
        error.issues.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            const field = err.path[0] as keyof CareersFormData;
            if (field === 'email' && err.code === 'invalid_format') {
              fieldErrors[field] = t.validation.emailInvalid;
            } else if (field === 'phone' && err.code === 'too_small') {
              fieldErrors[field] = t.validation.phoneMin;
            } else {
              fieldErrors[field] = fieldValidationMap[field as string] || err.message;
            }
          }
        });
        // Also check CV if it's missing
        if (!formData.cv) {
          fieldErrors.cv = t.errors.cvRequired;
        }
        setErrors(fieldErrors);
      } else {
        const errorMessage = error instanceof Error ? error.message : t.errors.submitFail;
        // Only show CV error if CV is missing; otherwise rely on general messaging/UI
        if (!formData.cv) {
          setErrors({ cv: errorMessage });
        } else {
          setErrors({ cv: undefined });
        }
        console.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, t.errors.cvRequired, t.errors.submitFail]);

  const inputClass = useMemo(() => 
    "w-full rounded-lg border-2 border-transparent bg-slate-50/80 px-4 py-3 text-[#1e3a5f] transition-all duration-200 ease-out focus:border-primary focus:bg-white focus:shadow-md focus:outline-none placeholder:text-slate-400"
  , []);

  return (
    <motion.div
      className="mx-auto max-w-6xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-800 uppercase tracking-widest rtl:tracking-normal">
            {t.header}
          </h2>
          {language === 'en' ? (
            <ArrowDownRight className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
          ) : (
            <ArrowDownLeft className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
          )}
        </div>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed text-start">
          {t.desc}
        </p>
      </div>
      <div>
      {isSuccess ? (
        <motion.div
          className="flex flex-col items-center justify-center rounded-2xl bg-linear-to-br from-emerald-50 to-green-50 border-2 border-emerald-200/50 p-12 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="mb-4 h-16 w-16 text-emerald-500" />
          </motion.div>
          <p className="text-xl font-semibold text-[#1e3a5f] mb-2">{t.successTitle}</p>
          <p className="text-slate-600">{t.successMsg}</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Full Name & Phone */}
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
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
                  <Info className="text-red-700 w-3 h-3" />
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
                  <Info className="text-red-700 w-3 h-3" />
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
                <Info className="text-red-700 w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-[#1e3a5f] text-start">
              {t.cvLabel}
            </label>
            <div className="relative">
              <input
                type="file"
                name="cv"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 w-full cursor-pointer opacity-0"
              />
              <div className="flex items-center gap-3 border-2 border-dashed border-slate-300 bg-slate-50/80 rounded-lg p-4 sm:p-6 transition-all duration-200 hover:border-primary hover:bg-white focus-within:border-primary focus-within:bg-white focus-within:shadow-md cursor-pointer">
                <Upload className="h-6 w-6 text-[#1e3a5f]" />
                <div>
                  <p className="text-sm font-medium text-[#1e3a5f]">
                    {formData.cv ? formData.cv.name : t.clickToUpload}
                  </p>
                  <p className="text-xs text-slate-600">{t.fileTypes}</p>
                </div>
              </div>
            </div>
            {errors.cv && (
              <p className="mt-1 flex items-center gap-1 text-xs sm:text-base text-red-500">
                <Info className="text-red-700 w-3 h-3" />
                {errors.cv}
              </p>
            )}
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-primary px-6 py-4 font-semibold text-white transition-all duration-200 hover:shadow-xl hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer mt-2 sm:mt-0 flex items-center justify-center"
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
      </div>
    </motion.div>
  );
}
