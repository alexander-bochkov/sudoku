import { useState } from 'react';
import { Button, Modal, PlayingField, ScreenLayout } from 'components';
import { useBoardContext } from 'contexts';
import type { FC } from 'react';
import type { Screen } from 'types/screen';
import styles from './GameScreen.module.scss';

type GameScreenProps = {
  onScreenChange: (nextScreen: Screen) => void;
};

export const GameScreen: FC<GameScreenProps> = ({ onScreenChange }) => {
  const [showPauseModal, setShowPauseModal] = useState<boolean>(false);

  const { dimensions } = useBoardContext();

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
                <PlayingField />
                <div className={styles.buttonsLayout}>
                  <Button number={1} onClick={() => {}} />
                  <Button number={2} onClick={() => {}} />
                  <Button number={3} onClick={() => {}} />
                  <Button number={4} onClick={() => {}} />
                  <Button number={5} onClick={() => {}} />
                  <Button number={6} onClick={() => {}} />
                  <Button number={7} onClick={() => {}} />
                  <Button number={8} onClick={() => {}} />
                  <Button number={9} onClick={() => {}} />
                  <Button withEraser onClick={() => {}} />
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
              onBottomButtonClick={() => onScreenChange('title')}
              onTopButtonClick={() => setShowPauseModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
};
