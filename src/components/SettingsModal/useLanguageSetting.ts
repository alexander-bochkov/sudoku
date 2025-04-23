import { useTranslation } from 'react-i18next';

import { SUPPORTED_LANGUAGES } from 'constants/language';
import { useParamsContext } from 'contexts';

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
  const { language, setLanguage } = useParamsContext();
  const { t } = useTranslation();

  return {
    label: t('modals.settings_modal.settings.language.label'),
    options: getLanguageOptions(),
    value: language,
    onChange: setLanguage,
  };
};
