'use client';

import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

export function LanguageSettings() {
  const [language, setLanguage] = useState('english');

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    toast.success(
      newLanguage === 'english'
        ? 'Language changed to English'
        : 'भाषा हिंदी में बदल दी गई है'
    );
    // Here you would integrate with a i18n library like next-i18next
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Language & Region
          </CardTitle>
          <CardDescription>
            Choose your preferred language for the app interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Language Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              App Language
            </label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-2">
              The entire app interface will switch to your selected language
            </p>
          </div>

          {/* Language Info */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-foreground font-medium mb-2">
              {language === 'english' ? 'Current Language: English' : 'वर्तमान भाषा: हिंदी'}
            </p>
            <p className="text-xs text-muted-foreground">
              {language === 'english'
                ? 'You are viewing AgriSathi in English. Switch to Hindi for better local experience.'
                : 'आप AgriSathi को हिंदी में देख रहे हैं। बेहतर स्थानीय अनुभव के लिए अंग्रेजी पर स्विच करें।'}
            </p>
          </div>

          {/* Additional Language Options */}
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-medium text-foreground mb-3">
              {language === 'english' ? 'Available Languages' : 'उपलब्ध भाषाएं'}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <div>
                  <p className="text-sm font-medium">English</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'english' ? 'Currently selected' : 'वर्तमान में चयनित'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <div className="h-3 w-3 rounded-full bg-green-600" />
                <div>
                  <p className="text-sm font-medium">हिंदी (Hindi)</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'english' ? 'Available for selection' : 'चयन के लिए उपलब्ध'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
