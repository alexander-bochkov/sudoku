import { ScreenLayout, StartButton, Title } from 'components';
import styles from './MainMenu.module.scss';

export const MainMenu = () => (
  <ScreenLayout
    header={<Title />}
    content={
      <div className={styles.mainMenu__startButtonLayout}>
        <StartButton />
      </div>
    }
    isMenu
  />
);
