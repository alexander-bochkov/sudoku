import { Button, PlayingField, ScreenLayout } from 'components';
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
            <Button withPause onClick={() => {}} />
            <PlayingField />
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
          </>
        }
      />
    </div>
  );
};
