import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParamsContext } from 'contexts';
import { Menu, Modal, ScreenLayout } from 'ui';
import styles from './MainMenu.module.scss';

export const MainMenu = () => {
  const { dimensions, setScreenId } = useParamsContext();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const { t } = useTranslation('main-menu');

  const items = useMemo(
    () => [
      {
        callback: () => {
          setScreenId('game');
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
    [setScreenId, t],
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
      {showSettingsModal && dimensions && (
        <Modal
          dimensions={dimensions}
          primaryAction={{
            callback: () => {
              setShowSettingsModal(false);
            },
            label: 'Back',
          }}
          title="Settings"
        >
          SETTINGS CONTENT
        </Modal>
      )}
    </>
  );
};
