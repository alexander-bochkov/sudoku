import { ScreenLayout, Title } from 'components';
import { useScreenContext } from 'contexts';
import { Menu } from 'ui';
import styles from './MainMenu.module.scss';

export const MainMenu = () => {
  const { onScreenChange } = useScreenContext();

  return (
    <ScreenLayout
      header={<Title />}
      content={
        <div className={styles.mainMenu__startButtonLayout}>
          <Menu
            items={[
              {
                callback: () => {
                  onScreenChange('game');
                },
                label: 'Start game',
              },
              {
                callback: () => {
                  return;
                },
                label: 'Settings',
              },
            ]}
          />
        </div>
      }
      isMenu
    />
  );
};
