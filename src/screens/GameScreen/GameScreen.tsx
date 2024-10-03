import { PlayingField, ScreenLayout } from 'components';
import type { FC } from 'react';
import type { Screen } from 'types';
import styles from './GameScreen.module.scss';

type GameScreenProps = {
  onScreenChange: (nextScreen: Screen) => void;
};

export const GameScreen: FC<GameScreenProps> = () => {
  return (
    <div className={styles.gameScreen}>
      <ScreenLayout
        heading={<p className={styles.title}>Sudoku</p>}
        content={
          <>
            <PlayingField />
          </>
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
