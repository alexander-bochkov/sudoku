import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParamsContext } from 'contexts';
import { Modal } from 'ui';
import type { FC } from 'react';

interface FinishModalProps {
  onRestart: () => void;
}

export const FinishModal: FC<FinishModalProps> = ({ onRestart }) => {
  const { t } = useTranslation('finish-modal');
  const { dimensions, setScreenId } = useParamsContext();

  const primaryAction = useMemo(
    () => ({
      callback: () => {
        setScreenId('main-menu');
      },
      label: t('primary_action'),
    }),
    [setScreenId, t],
  );

  const secondaryAction = useMemo(
    () => ({
      callback: onRestart,
      label: t('secondary_action'),
    }),
    [onRestart, t],
  );

  return (
    dimensions && (
      <Modal
        dimensions={dimensions}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        title={t('title')}
      />
    )
  );
};
