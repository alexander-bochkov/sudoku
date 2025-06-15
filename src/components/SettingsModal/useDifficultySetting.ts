import { useTranslation } from 'react-i18next';

import { useParamsContext } from 'contexts';

import type { Setting } from 'types/settings';
import type { Difficulty } from 'types/sudoku';

export const useDifficultySetting = (): Setting<Difficulty> => {
  const { difficulty, setDifficulty } = useParamsContext();
  const { t } = useTranslation();

  return {
    label: t('modals.settings_modal.settings.difficulty.label'),
    options: [
      { label: t('modals.settings_modal.settings.difficulty.options.easy'), value: 'easy' },
      { label: t('modals.settings_modal.settings.difficulty.options.medium'), value: 'medium' },
      { label: t('modals.settings_modal.settings.difficulty.options.hard'), value: 'hard' },
    ],
    value: difficulty,
    onChange: setDifficulty,
  };
};
