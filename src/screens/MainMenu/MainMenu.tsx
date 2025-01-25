import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingsModal } from 'components';
import { useParamsContext } from 'contexts';
import { Menu, ScreenLayout } from 'ui';
import styles from './MainMenu.module.scss';

export const MainMenu = () => {
  const { changeScreen } = useParamsContext();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const { t } = useTranslation('menu');

  const items = useMemo(
    () => [
      {
        callback: () => {
          changeScreen('game');
        },
        label: t('start_game'),
      },
      {
        callback: () => {
          setShowSettingsModal(true);
        },
        label: t('settings'),
      },
    ],
    [changeScreen, t],
  );

  return (
    <>
      <ScreenLayout
        header={<h1 className={styles.mainMenu__title}>Sudoku</h1>}
        content={
          <div className={styles.mainMenu__menuLayout}>
            <Menu items={items} />
          </div>
        }
      />
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
