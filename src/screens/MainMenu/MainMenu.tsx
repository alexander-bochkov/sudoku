import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { SettingsModal } from 'components';
import { ROUTES } from 'constants/routes';
import { Menu } from 'ui';

import styles from './MainMenu.module.scss';

const TITLE = 'Sudoku';

export const MainMenu = () => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const menuItems = [
    {
      callback: () => {
        void navigate(ROUTES.GAME);
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
