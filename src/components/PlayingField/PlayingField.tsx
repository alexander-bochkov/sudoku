import { GridCanvas } from './GridCanvas';
import { InteractiveCanvas } from './InteractiveCanvas';
import { NumbersCanvas } from './NumbersCanvas';
import { usePlayingField } from 'contexts';
import { getPlayingFieldStyle } from './utils';
import type { FC } from 'react';
import styles from './PlayingField.module.scss';

export const PlayingField: FC = () => {
  const { dimensions, sudoku } = usePlayingField();

  if (!dimensions || !sudoku) return;

  return (
    <div className={styles.playingField} style={getPlayingFieldStyle(dimensions.field, dimensions.cell)}>
      <GridCanvas className={styles.canvas} dimensions={dimensions} />
      <NumbersCanvas className={styles.canvas} dimensions={dimensions} sudoku={sudoku} />
      <InteractiveCanvas className={styles.canvas} dimensions={dimensions} />
    </div>
  );
};
