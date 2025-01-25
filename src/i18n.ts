import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from 'constants/language';

const BASE_URL = import.meta.env.VITE_BASE_URL ?? '/';

void i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `${BASE_URL}translations/{{lng}}/{{ns}}.json`,
    },
    defaultNS: [],
    detection: {
      convertDetectedLanguage: (lng) => lng.slice(0, 2),
      lookupLocalStorage: 'language',
    },
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    load: 'languageOnly',
    ns: [],
    supportedLngs: SUPPORTED_LANGUAGES,
  });

export default i18n;
