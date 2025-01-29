import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useParamsContext } from 'contexts';
import { Modal } from 'ui';

import type { FC } from 'react';

interface PauseModalProps {
  onResume: () => void;
}

export const PauseModal: FC<PauseModalProps> = ({ onResume }) => {
  const { t } = useTranslation('common');
  const { changeScreen } = useParamsContext();

  const primaryAction = useMemo(
    () => ({
      callback: () => {
        changeScreen('main-menu');
      },
      label: t('modals.pause_modal.primary_action'),
    }),
    [changeScreen, t],
  );

  const secondaryAction = useMemo(
    () => ({
      callback: onResume,
      label: t('modals.pause_modal.secondary_action'),
    }),
    [onResume, t],
  );

  return (
    <Modal primaryAction={primaryAction} secondaryAction={secondaryAction} title={t('modals.pause_modal.title')} />
  );
};
