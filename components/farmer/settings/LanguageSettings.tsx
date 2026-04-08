'use client';

import React from 'react';
import { useTheme } from '@/lib/theme-context';
import { useTranslation } from '@/lib/use-translation';
import { LANGUAGES } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function LanguageSettings() {
  const { language, setLanguage, isDark, setIsDark } = useTheme();
  const { t } = useTranslation();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="space-y-6">
      {/* Language Selection */}
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.language')}</CardTitle>
          <CardDescription>
            Choose your preferred language for the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={language} onValueChange={handleLanguageChange}>
            <div className="space-y-4">
              {(Object.entries(LANGUAGES) as [Language, typeof LANGUAGES['en']][]).map(([lang, info]) => (
                <div key={lang} className="flex items-center space-x-2">
                  <RadioGroupItem value={lang} id={lang} />
                  <Label htmlFor={lang} className="cursor-pointer flex-1">
                    <div>
                      <p className="font-medium">{info.nativeName}</p>
                      <p className="text-sm text-muted-foreground">{info.name}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Theme Selection */}
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.theme')}</CardTitle>
          <CardDescription>
            Choose between light and dark mode for comfortable viewing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={!isDark ? 'default' : 'outline'}
              onClick={() => setIsDark(false)}
              className="h-24 flex flex-col items-center justify-center"
            >
              <div className="text-2xl mb-2">☀️</div>
              <span>{t('settings.lightMode')}</span>
            </Button>
            <Button
              variant={isDark ? 'default' : 'outline'}
              onClick={() => setIsDark(true)}
              className="h-24 flex flex-col items-center justify-center"
            >
              <div className="text-2xl mb-2">🌙</div>
              <span>{t('settings.darkMode')}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-base">Language & Theme Support</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Your language and theme preferences are saved automatically. We use modern i18n standards to support multiple languages, 
          making it easy to add new languages in the future. Theme preference is synced across all your devices.
        </CardContent>
      </Card>
    </div>
  );
}
