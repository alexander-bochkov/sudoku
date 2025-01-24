import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from 'constants/language';
import type { SupportedLanguage } from 'types/language';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    (language: SupportedLanguage) => {
      if (SUPPORTED_LANGUAGES.includes(language)) {
        void i18n.changeLanguage(language);
      }
    },
    [i18n],
  );

  return useMemo(
    () =>
      ({
        changeLanguage,
        // If a language detected by i18next-browser-languagedetector isn't supported, the fallback language will be used
        language: i18n.language as SupportedLanguage,
      }) as const,
    [changeLanguage, i18n.language],
  );
};
