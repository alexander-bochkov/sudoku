import { GridCanvas } from './GridCanvas';
import { NumbersCanvas } from './NumbersCanvas';
import { usePlayingFieldDimensions } from 'contexts';
import { getPlayingFieldStyle } from './utils';
import type { FC } from 'react';
import styles from './PlayingField.module.scss';

export const PlayingField: FC = () => {
  const { dimensions } = usePlayingFieldDimensions();

  if (!dimensions) return;

  return (
    <div className={styles.playingField} style={getPlayingFieldStyle(dimensions.field, dimensions.cell)}>
      <GridCanvas className={styles.canvas} dimensions={dimensions} />
      <NumbersCanvas className={styles.canvas} dimensions={dimensions} />
    </div>
  );
};
