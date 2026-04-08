'use client';

import { useTheme } from './theme-context';
import { getTranslation } from './i18n';

export function useTranslation() {
  const { language } = useTheme();

  const t = (key: string): string => {
    return getTranslation(language, key);
  };

  return { t, language };
}
