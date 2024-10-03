import { Button, PlayingField, ScreenLayout } from 'components';
import { useState } from 'react';
import type { FC } from 'react';
import type { Screen } from 'types';
import styles from './GameScreen.module.scss';

type GameScreenProps = {
  onScreenChange: (nextScreen: Screen) => void;
};

export const GameScreen: FC<GameScreenProps> = () => {
  const [size, setSize] = useState<number>(0);

  const handlePlayingFieldResize = (nextSize: number) => {
    setSize(nextSize);
  };

  return (
    <div className={styles.gameScreen}>
      <ScreenLayout
        heading={<p className={styles.title}>Sudoku</p>}
        content={
          <div className={styles.contentLayout}>
            <div className={styles.pauseButtonLayout} style={{ width: size }}>
              <Button withPause onClick={() => {}} />
            </div>
            <PlayingField onPlayingFieldResize={handlePlayingFieldResize} />
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
    </div>
  );
};
