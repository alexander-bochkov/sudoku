import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from 'constants/language';
import { useParamsContext } from 'contexts';
import type { SupportedLanguage } from 'types/language';

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

export const useLanguageSetting = () => {
  const { t } = useTranslation('common');
  const { changeLanguage, language } = useParamsContext();

  const setting = useMemo(
    () => ({
      label: t('modals.settings_modal.settings.language'),
      options: getLanguageOptions(),
      value: language,
      onChange: changeLanguage,
    }),
    [changeLanguage, language, t],
  );

  return setting;
};
