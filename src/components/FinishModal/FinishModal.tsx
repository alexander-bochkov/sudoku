import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { ROUTES } from 'constants/routes';
import { Modal } from 'ui';

type FinishModalProps = {
  onRestart: () => void;
};

export const FinishModal = ({ onRestart }: FinishModalProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const primaryAction = {
    callback: () => {
      void navigate(ROUTES.MAIN_MENU);
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
