'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { Globe, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from '@/lib/theme-context';

function ThemeControlsContent() {
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage, isDark, setIsDark } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

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
            onCheckedChange={() => setLanguage('en')}
          >
            English
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={language === 'hi'}
            onCheckedChange={() => setLanguage('hi')}
          >
            हिंदी
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Selector */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsDark(!isDark)}
        title={isDark ? 'Light Mode' : 'Dark Mode'}
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </>
  );
}

export function ThemeControls() {
  return (
    <Suspense fallback={
      <>
        <Button variant="ghost" size="icon" disabled>
          <Globe className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" disabled>
          <Moon className="h-5 w-5" />
        </Button>
      </>
    }>
      <ThemeControlsContent />
    </Suspense>
  );
}
