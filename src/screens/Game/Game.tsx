import { useState } from 'react';
import { Board, FinishModal, PauseModal } from 'components';
import { useBoardContext, useParamsContext } from 'contexts';
import { Button, Modal, Numpad, ScreenLayout } from 'ui';
import type { FC } from 'react';
import styles from './Game.module.scss';

export const Game: FC = () => {
  const [showPauseModal, setShowPauseModal] = useState<boolean>(false);

  const { status, onErase, onErrorsCheck, onNumberSelect, onRestart } = useBoardContext();
  const { dimensions } = useParamsContext();

  return (
    dimensions && (
      <>
        <ScreenLayout
          content={
            <div className={styles.game}>
              <div className={styles.game__contentLayout}>
                <div className={styles.game__pauseButtonLayout} style={{ width: dimensions.board }}>
                  <Button
                    icon="pause"
                    onClick={() => {
                      setShowPauseModal(true);
                    }}
                  />
                </div>
                <Board />
                <Numpad onErase={onErase} onNumberSelect={onNumberSelect} />
              </div>
            </div>
          }
        />
        {showPauseModal && (
          <PauseModal
            onResume={() => {
              setShowPauseModal(false);
            }}
          />
        )}
        {status === 'error' && (
          <Modal
            dimensions={dimensions}
            primaryAction={{
              callback: onErrorsCheck,
              label: 'Check mistakes',
            }}
            title="Oops!"
          />
        )}
        {status === 'completed' && <FinishModal onRestart={onRestart} />}
      </>
    )
  );
};
