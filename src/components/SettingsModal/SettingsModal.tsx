import { useTranslation } from 'react-i18next';

import { Modal, Settings } from 'ui';

import { useLanguageSetting } from './useLanguageSetting';

type SettingsModalProps = {
  onClose: () => void;
};

export const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const languageSetting = useLanguageSetting();
  const { t } = useTranslation();

  const primaryAction = {
    callback: onClose,
    label: t('modals.settings_modal.primary_action'),
  };

  const settings = [languageSetting];

  return (
    <Modal primaryAction={primaryAction} title={t('modals.settings_modal.title')}>
      <Settings items={settings} />
    </Modal>
  );
};
