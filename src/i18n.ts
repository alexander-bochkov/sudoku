import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from 'constants/language';

const BASE_URL = import.meta.env.VITE_BASE_URL ?? '/';

void i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `${BASE_URL}translations/{{lng}}/{{ns}}.json`,
    },
    detection: {
      convertDetectedLanguage: (lng) => lng.slice(0, 2),
      lookupLocalStorage: 'language',
    },
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
    load: 'languageOnly',
    supportedLngs: SUPPORTED_LANGUAGES,
  });

export default i18n;
