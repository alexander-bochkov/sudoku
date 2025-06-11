import { useTranslation } from 'react-i18next';

import { SUPPORTED_LANGUAGES } from 'constants/language';

import type { SupportedLanguage } from 'types/language';
import type { Setting } from 'types/settings';

const LANGUAGES: Record<SupportedLanguage, string> = {
  de: 'Deutsch',
  en: 'English',
  ru: 'Русский',
};

const getLanguageOptions = () =>
  SUPPORTED_LANGUAGES.map((language) => ({
    label: LANGUAGES[language],
    value: language,
  }));

export const useLanguageSetting = (): Setting<SupportedLanguage> => {
  const { i18n, t } = useTranslation();

  return {
    label: t('modals.settings_modal.settings.language.label'),
    options: getLanguageOptions(),
    // If a language detected by i18next-browser-languagedetector isn't supported, the default language will be used
    value: i18n.language as SupportedLanguage,
    onChange: (language: SupportedLanguage) => {
      void i18n.changeLanguage(language);
    },
  };
};
