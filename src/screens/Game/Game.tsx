import { FinishModal, PauseModal } from 'components';
import { useGameContext } from 'contexts';
import { Board, Button, Numpad } from 'ui';

import styles from './Game.module.scss';

export const Game = () => {
  const { board, changeSelectedCell, selectedCell, status, onNumpadClick, onPause, onRestart } = useGameContext();

  return (
    board && (
      <>
        <div className={styles.contentLayout}>
          <div className={styles.pauseLayout}>
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
