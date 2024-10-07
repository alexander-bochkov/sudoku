import { ScreenLayout } from 'components';
import type { FC } from 'react';
import type { Screen } from 'types/screen';
import styles from './TitleScreen.module.scss';

type TitleScreenProps = {
  onScreenChange: (nextScreen: Screen) => void;
};

export const TitleScreen: FC<TitleScreenProps> = ({ onScreenChange }) => {
  return (
    <div className={styles.titleScreen}>
      <ScreenLayout
        heading={<p className={styles.title}>Sudoku</p>}
        content={
          <div className={styles.menuLayout}>
            <span className={styles.startGame} onClick={() => onScreenChange('game')}>
              Start game
            </span>
          </div>
        }
      />
    </div>
  );
};
