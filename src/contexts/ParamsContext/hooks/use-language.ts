import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { SUPPORTED_LANGUAGES } from 'constants/language';

import type { SupportedLanguage } from 'types/language';

export const useLanguage = (changeShowLoader: (showLoader: boolean) => void) => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    (language: SupportedLanguage) => {
      if (SUPPORTED_LANGUAGES.includes(language)) {
        changeShowLoader(true);

        void i18n.changeLanguage(language, () => {
          changeShowLoader(false);
        });
      }
    },
    [i18n, changeShowLoader],
  );

  return useMemo(
    () => ({
      changeLanguage,
      // If a language detected by i18next-browser-languagedetector isn't supported, the default language will be used
      language: i18n.language as SupportedLanguage,
    }),
    [changeLanguage, i18n.language],
  );
};
