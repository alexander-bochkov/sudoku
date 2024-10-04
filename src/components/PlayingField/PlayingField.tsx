import { useEffect, useRef } from 'react';
import { GridCanvas } from './GridCanvas';
import { usePlayingFieldDimensions } from './hooks';
import { drawPlayingField, getPlayingFieldStyle } from './utils';
import type { FC } from 'react';
import styles from './PlayingField.module.scss';

type PlayingFieldProps = {
  onPlayingFieldResize: (nextSize: number) => void;
};

export const PlayingField: FC<PlayingFieldProps> = ({ onPlayingFieldResize }) => {
  const dimensions = usePlayingFieldDimensions();

  const canvasRef = useRef(null);

  useEffect(() => {
    drawPlayingField(canvasRef.current, dimensions);
    onPlayingFieldResize(dimensions.field);
  }, [dimensions, onPlayingFieldResize]);

  return (
    <div className={styles.playingField} style={getPlayingFieldStyle(dimensions.field, dimensions.cell)}>
      <GridCanvas className={styles.canvas} dimensions={dimensions} />
      <canvas
        className={styles.canvas}
        height={String(dimensions.field)}
        ref={canvasRef}
        width={dimensions.field}
      ></canvas>
    </div>
  );
};
