'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Language } from './i18n';

interface ThemeContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('agrisathi-language') as Language;
    const savedDark = localStorage.getItem('agrisathi-dark-mode') === 'true';

    if (savedLang && ['en', 'hi'].includes(savedLang)) {
      setLanguage(savedLang);
    }
    setIsDark(savedDark);
    setMounted(true);
  }, []);

  // Save language to localStorage and update document
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('agrisathi-language', lang);
    document.documentElement.lang = lang;
  };

  // Save theme to localStorage and update document
  const handleSetIsDark = (dark: boolean) => {
    setIsDark(dark);
    localStorage.setItem('agrisathi-dark-mode', dark.toString());
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        isDark,
        setIsDark: handleSetIsDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
