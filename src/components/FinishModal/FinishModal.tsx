import { useTranslation } from 'react-i18next';

import { useParamsContext } from 'contexts';
import { Modal } from 'ui';

type FinishModalProps = {
  onRestart: () => void;
};

export const FinishModal = ({ onRestart }: FinishModalProps) => {
  const { t } = useTranslation();
  const { setScreen } = useParamsContext();

  const primaryAction = {
    callback: () => {
      setScreen('main_menu');
    },
    label: t('modals.finish_modal.primary_action'),
  };

  const secondaryAction = {
    callback: onRestart,
    label: t('modals.finish_modal.secondary_action'),
  };

  return (
    <Modal primaryAction={primaryAction} secondaryAction={secondaryAction} title={t('modals.finish_modal.title')} />
  );
};
