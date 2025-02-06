import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SettingsModal } from 'components';
import { useParamsContext } from 'contexts';
import { Menu, Screen } from 'ui';

import styles from './MainMenu.module.scss';

export const MainMenu = () => {
  const { changeScreen } = useParamsContext();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const { t } = useTranslation('common');

  const menuItems = [
    {
      callback: () => {
        changeScreen('game');
      },
      label: t('menu.start_game'),
    },
    {
      callback: () => {
        setShowSettingsModal(true);
      },
      label: t('menu.settings'),
    },
  ];

  return (
    <Screen>
      <h1 className={styles.mainMenu__title}>Sudoku</h1>
      <div className={styles.mainMenu__menuLayout}>
        <Menu items={menuItems} />
      </div>
      {showSettingsModal && (
        <SettingsModal
          onClose={() => {
            setShowSettingsModal(false);
          }}
        />
      )}
    </Screen>
  );
};
