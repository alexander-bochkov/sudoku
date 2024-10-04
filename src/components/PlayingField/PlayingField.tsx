import { useEffect, useRef, useState } from 'react';
import { GridCanvas } from './GridCanvas';
import { drawPlayingField, getPlayingFieldDimensions, getPlayingFieldStyle } from './utils';
import type { FC } from 'react';
import type { Dimensions } from './types';
import styles from './PlayingField.module.scss';

type PlayingFieldProps = {
  onPlayingFieldResize: (nextSize: number) => void;
};

export const PlayingField: FC<PlayingFieldProps> = ({ onPlayingFieldResize }) => {
  const [dimensions, setDimensions] = useState<Dimensions>(() =>
    getPlayingFieldDimensions(window.innerHeight, window.innerWidth),
  );

  const canvasRef = useRef(null);

  useEffect(() => {
    const nextDimensions = getPlayingFieldDimensions(window.innerHeight, window.innerWidth);

    setDimensions(nextDimensions);

    onPlayingFieldResize(nextDimensions.field);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    drawPlayingField(canvasRef.current, dimensions);
  }, [dimensions]);

  useEffect(() => {
    const handleResize = ({ target }: Event) => {
      const { innerHeight, innerWidth } = target as Window;
      const nextDimensions = getPlayingFieldDimensions(innerHeight, innerWidth);

      setDimensions(nextDimensions);

      onPlayingFieldResize(nextDimensions.field);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onPlayingFieldResize]);

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
