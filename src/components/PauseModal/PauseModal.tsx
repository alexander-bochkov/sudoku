import { useTranslation } from 'react-i18next';

import { useParamsContext } from 'contexts';
import { Modal } from 'ui';

type PauseModalProps = {
  onResume: () => void;
};

export const PauseModal = ({ onResume }: PauseModalProps) => {
  const { setScreen } = useParamsContext();
  const { t } = useTranslation();

  const primaryAction = {
    callback: () => {
      setScreen('main_menu');
    },
    label: t('modals.pause_modal.primary_action'),
  };

  const secondaryAction = {
    callback: onResume,
    label: t('modals.pause_modal.secondary_action'),
  };

  return (
    <Modal primaryAction={primaryAction} secondaryAction={secondaryAction} title={t('modals.pause_modal.title')} />
  );
};
