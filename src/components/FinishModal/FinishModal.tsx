import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParamsContext } from 'contexts';
import { Modal } from 'ui';
import type { FC } from 'react';

interface FinishModalProps {
  onRestart: () => void;
}

export const FinishModal: FC<FinishModalProps> = ({ onRestart }) => {
  const { t } = useTranslation('modals');
  const { changeScreen, dimensions } = useParamsContext();

  const primaryAction = useMemo(
    () => ({
      callback: () => {
        changeScreen('main-menu');
      },
      label: t('finish_modal.primary_action'),
    }),
    [changeScreen, t],
  );

  const secondaryAction = useMemo(
    () => ({
      callback: onRestart,
      label: t('finish_modal.secondary_action'),
    }),
    [onRestart, t],
  );

  return (
    dimensions && (
      <Modal
        dimensions={dimensions}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        title={t('finish_modal.title')}
      />
    )
  );
};
