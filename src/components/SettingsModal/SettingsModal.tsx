import { useTranslation } from 'react-i18next';

import { Modal, Setting, Settings } from 'ui';

import { useDifficultySetting } from './use-difficulty-setting';
import { useLanguageSetting } from './use-language-setting';

type SettingsModalProps = {
  onClose: () => void;
};

export const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const difficultySetting = useDifficultySetting();
  const languageSetting = useLanguageSetting();

  const { t } = useTranslation();

  const primaryAction = {
    callback: onClose,
    label: t('modals.settings_modal.primary_action'),
  };

  return (
    <Modal primaryAction={primaryAction} title={t('modals.settings_modal.title')}>
      <Settings>
        <Setting {...languageSetting} />
        <Setting {...difficultySetting} />
      </Settings>
    </Modal>
  );
};
