import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SettingsModal } from 'components';
import { useParamsContext } from 'contexts';
import { Menu } from 'ui';

import styles from './MainMenu.module.scss';

const TITLE = 'Sudoku';

export const MainMenu = () => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const { setScreen } = useParamsContext();
  const { t } = useTranslation();

  const menuItems = [
    {
      callback: () => {
        setScreen('game');
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
    <>
      <h1 className={styles.title}>{TITLE}</h1>
      <div className={styles.menuLayout}>
        <Menu items={menuItems} />
      </div>
      {showSettingsModal && (
        <SettingsModal
          onClose={() => {
            setShowSettingsModal(false);
          }}
        />
      )}
    </>
  );
};
