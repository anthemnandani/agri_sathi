'use client';

import React, { useEffect, useState } from 'react';
import { Globe, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function ThemeControls() {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    // Load from localStorage on client side only
    const savedLang = localStorage.getItem('language') as 'en' | 'hi' | null;
    const savedDark = localStorage.getItem('isDark') === 'true';
    
    if (savedLang) setLanguage(savedLang);
    if (savedDark) setIsDark(savedDark);
    
    setMounted(true);
  }, []);

  const handleLanguageChange = (lang: 'en' | 'hi') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleThemeChange = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem('isDark', String(newDark));
  };

  if (!mounted) {
    return (
      <>
        <Button variant="ghost" size="icon" disabled>
          <Globe className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" disabled>
          <Moon className="h-5 w-5" />
        </Button>
      </>
    );
  }

  return (
    <>
      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Globe className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            checked={language === 'en'}
            onCheckedChange={() => handleLanguageChange('en')}
          >
            English
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={language === 'hi'}
            onCheckedChange={() => handleLanguageChange('hi')}
          >
            हिंदी
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Selector */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleThemeChange}
        title={isDark ? 'Light Mode' : 'Dark Mode'}
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </>
  );
}
