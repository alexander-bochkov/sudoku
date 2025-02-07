import { useTranslation } from 'react-i18next';

import type { SupportedLanguage } from 'types/language';

export const useLanguage = (setLoader: (loader: boolean) => void) => {
  const { i18n } = useTranslation();

  const setLanguage = (language: SupportedLanguage) => {
    setLoader(true);

    void i18n.changeLanguage(language, () => {
      setLoader(false);
    });
  };
  // If a language detected by i18next-browser-languagedetector isn't supported, the default language will be used
  return [i18n.language as SupportedLanguage, setLanguage] as const;
};
