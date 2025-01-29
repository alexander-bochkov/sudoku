import { FinishModal, PauseModal } from 'components';
import { useGameContext } from 'contexts';
import { Board, Button, Numpad, ScreenLayout } from 'ui';

import styles from './Game.module.scss';

export const Game = () => {
  const { board, changeSelectedCell, selectedCell, status, onNumpadClick, onPause, onRestart } = useGameContext();

  return (
    board && (
      <>
        <ScreenLayout
          content={
            <div className={styles.game}>
              <div className={styles.game__contentLayout}>
                <div className={styles.game__pauseButtonLayout}>
                  <Button
                    icon="pause"
                    onClick={() => {
                      onPause(true);
                    }}
                  />
                </div>
                <Board board={board} selectedCell={selectedCell} onSelect={changeSelectedCell} />
                <Numpad onClick={onNumpadClick} />
              </div>
            </div>
          }
        />
        {status === 'paused' && (
          <PauseModal
            onResume={() => {
              onPause(false);
            }}
          />
        )}
        {status === 'finished' && <FinishModal onRestart={onRestart} />}
      </>
    )
  );
};
