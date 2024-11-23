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
                    withPause
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
            bottomButton="Return to Main Menu"
            size={dimensions.board}
            title="Pause"
            topButton="Continue"
            onBottomButtonClick={() => {
              onScreenChange('main-menu');
            }}
            onTopButtonClick={() => {
              setShowPauseModal(false);
            }}
          />
        )}
        {status === 'error' && (
          <Modal
            bottomButton="Check mistakes"
            size={dimensions.board}
            title="Oops!"
            onBottomButtonClick={onErrorsCheck}
          />
        )}
        {status === 'completed' && (
          <Modal
            bottomButton="Return to Main Menu"
            onBottomButtonClick={() => {
              onScreenChange('main-menu');
            }}
            onTopButtonClick={onRestart}
            size={dimensions.board}
            title="Done"
            topButton="Play again"
          />
        )}
      </>
    )
  );
};
