import { useState } from 'react';
import { Board, Button, Modal, ScreenLayout } from 'components';
import { useBoardContext, useScreenContext } from 'contexts';
import type { FC } from 'react';
import styles from './GameScreen.module.scss';

export const GameScreen: FC = () => {
  const [showPauseModal, setShowPauseModal] = useState<boolean>(false);

  const { dimensions, onNumberSelect, onErase, status, onErrorsCheck, onRestart } = useBoardContext();
  const { onScreenChange } = useScreenContext();

  return (
    <div className={styles.gameScreen}>
      {dimensions && (
        <>
          <ScreenLayout
            heading={<p className={styles.title}>Sudoku</p>}
            content={
              <div className={styles.contentLayout}>
                <div className={styles.pauseButtonLayout} style={{ width: dimensions.board }}>
                  <Button
                    withPause
                    onClick={() => {
                      setShowPauseModal(true);
                    }}
                  />
                </div>
                <Board />
                <div className={styles.buttonsLayout}>
                  <Button number={1} onClick={() => onNumberSelect(1)} />
                  <Button number={2} onClick={() => onNumberSelect(2)} />
                  <Button number={3} onClick={() => onNumberSelect(3)} />
                  <Button number={4} onClick={() => onNumberSelect(4)} />
                  <Button number={5} onClick={() => onNumberSelect(5)} />
                  <Button number={6} onClick={() => onNumberSelect(6)} />
                  <Button number={7} onClick={() => onNumberSelect(7)} />
                  <Button number={8} onClick={() => onNumberSelect(8)} />
                  <Button number={9} onClick={() => onNumberSelect(9)} />
                  <Button withEraser onClick={onErase} />
                </div>
              </div>
            }
            isGame
          />
          {showPauseModal && (
            <Modal
              bottomButton="Return to Main Menu"
              size={dimensions.board}
              title="Pause"
              topButton="Continue"
              onBottomButtonClick={() => onScreenChange('main-menu')}
              onTopButtonClick={() => setShowPauseModal(false)}
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
              onBottomButtonClick={() => onScreenChange('main-menu')}
              onTopButtonClick={onRestart}
              size={dimensions.board}
              title="Done"
              topButton="Play again"
            />
          )}
        </>
      )}
    </div>
  );
};
