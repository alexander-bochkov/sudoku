import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from 'ui';

import { Settings } from './Settings';

import type { FC } from 'react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: FC<SettingsModalProps> = ({ onClose }) => {
  const { t } = useTranslation('common');

  const primaryAction = useMemo(
    () => ({
      callback: onClose,
      label: t('modals.settings_modal.primary_action'),
    }),
    [onClose, t],
  );

  return (
    <Modal primaryAction={primaryAction} title={t('modals.settings_modal.title')}>
      <Settings />
    </Modal>
  );
};
