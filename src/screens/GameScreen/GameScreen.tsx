import { ScreenLayout } from 'components';
import type { FC } from 'react';
import type { Screen } from 'types';
import styles from './GameScreen.module.scss';

type GameScreenProps = {
  onScreenChange: (nextScreen: Screen) => void;
};

export const GameScreen: FC<GameScreenProps> = () => {
  return (
    <div className={styles.titleScreen}>
      <ScreenLayout
        heading={<p className={styles.title}>Sudoku</p>}
        content={
          'Some content'
          // <div className={styles.menuLayout}>
          //   <span className={styles.startGame} onClick={() => onScreenChange('game')}>
          //     Start game
          //   </span>
          // </div>
        }
      />
    </div>
  );
};
