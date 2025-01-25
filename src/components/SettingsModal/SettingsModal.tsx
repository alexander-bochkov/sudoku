import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParamsContext } from 'contexts';
import { Modal } from 'ui';
import { Settings } from './Settings';
import type { FC } from 'react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: FC<SettingsModalProps> = ({ onClose }) => {
  const { t } = useTranslation('modals');
  const { dimensions } = useParamsContext();

  const primaryAction = useMemo(
    () => ({
      callback: onClose,
      label: t('settings_modal.primary_action'),
    }),
    [onClose, t],
  );

  return (
    dimensions && (
      <Modal dimensions={dimensions} primaryAction={primaryAction} title={t('settings_modal.title')}>
        <Settings />
      </Modal>
    )
  );
};
