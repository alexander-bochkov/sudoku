import { useState } from 'react';
import { Board, Button, ButtonsGroup, Modal, ScreenLayout, Title } from 'components';
import { useBoardContext, useScreenContext } from 'contexts';
import type { FC } from 'react';
import styles from './Game.module.scss';

export const Game: FC = () => {
  const [showPauseModal, setShowPauseModal] = useState<boolean>(false);

  const { dimensions, status, onErrorsCheck, onRestart } = useBoardContext();
  const { onScreenChange } = useScreenContext();

  return (
    dimensions && (
      <>
        <ScreenLayout
          header={<Title />}
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
                <ButtonsGroup />
              </div>
            </div>
          }
        />
        {showPauseModal && (
          <Modal
            dimensions={dimensions}
            primaryAction={{
              callback: () => {
                onScreenChange('main-menu');
              },
              label: 'Return to Main Menu',
            }}
            secondaryAction={{
              callback: () => {
                setShowPauseModal(false);
              },
              label: 'Continue',
            }}
            title="Pause"
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
        {status === 'completed' && (
          <Modal
            dimensions={dimensions}
            primaryAction={{
              callback: () => {
                onScreenChange('main-menu');
              },
              label: 'Return to Main Menu',
            }}
            secondaryAction={{
              callback: onRestart,
              label: 'Play again',
            }}
            title="Done"
          />
        )}
      </>
    )
  );
};
