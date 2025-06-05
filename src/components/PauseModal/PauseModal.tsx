import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { ROUTES } from 'constants/routes';
import { Modal } from 'ui';

type PauseModalProps = {
  onResume: () => void;
};

export const PauseModal = ({ onResume }: PauseModalProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const primaryAction = {
    callback: () => {
      void navigate(ROUTES.MAIN_MENU);
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
