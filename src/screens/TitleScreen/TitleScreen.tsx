import { ScreenLayout } from 'components';
import { useScreenContext } from 'contexts';
import type { FC } from 'react';
import styles from './TitleScreen.module.scss';

export const TitleScreen: FC = () => {
  const { onScreenChange } = useScreenContext();

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
