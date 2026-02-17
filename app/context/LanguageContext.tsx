"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";
type Direction = "ltr" | "rtl";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [direction, setDirection] = useState<Direction>("ltr");

  useEffect(() => {
    // Check local storage or browser preference on mount
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "ar")) {
      setLanguageState(savedLang);
      setDirection(savedLang === "ar" ? "rtl" : "ltr");
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setDirection(lang === "ar" ? "rtl" : "ltr");
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };
  
  // Basic translation function placeholder
  const t = (key: string) => {
      // return translations[language][key] || key;
      return key;
  };


  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, setLanguage, t }}>
      <div dir={direction} className={direction === "rtl" ? "font-arabic" : "font-sans"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
