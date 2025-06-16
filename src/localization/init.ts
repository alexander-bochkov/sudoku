import i18n from 'i18next';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from 'constants/language';

import { resources } from './resources';

export const init = () => {
  void i18n
    .use(i18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
      detection: {
        convertDetectedLanguage: (lng) => lng.slice(0, 2),
        lookupLocalStorage: 'language',
      },
      fallbackLng: DEFAULT_LANGUAGE,
      interpolation: {
        escapeValue: false,
      },
      load: 'languageOnly',
      resources,
      supportedLngs: SUPPORTED_LANGUAGES,
    });
};
