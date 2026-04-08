'use client';

import React from 'react';
import { Globe, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from '@/lib/theme-context';

export function ThemeControls() {
  const { language, setLanguage, isDark, setIsDark } = useTheme();

  const handleLanguageChange = (lang: 'en' | 'hi') => {
    setLanguage(lang);
  };

  const handleThemeChange = () => {
    setIsDark(!isDark);
  };

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
