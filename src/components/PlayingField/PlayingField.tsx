import { useEffect } from 'react';
import { GridCanvas } from './GridCanvas';
import { usePlayingFieldDimensions } from './hooks';
import { getPlayingFieldStyle } from './utils';
import type { FC } from 'react';
import styles from './PlayingField.module.scss';

type PlayingFieldProps = {
  onPlayingFieldResize: (nextSize: number) => void;
};

export const PlayingField: FC<PlayingFieldProps> = ({ onPlayingFieldResize }) => {
  const dimensions = usePlayingFieldDimensions();

  useEffect(() => {
    onPlayingFieldResize(dimensions.field);
  }, [dimensions, onPlayingFieldResize]);

  return (
    <div className={styles.playingField} style={getPlayingFieldStyle(dimensions.field, dimensions.cell)}>
      <GridCanvas className={styles.canvas} dimensions={dimensions} />
    </div>
  );
};
