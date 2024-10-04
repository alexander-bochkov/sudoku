import { useEffect, useRef, useState } from 'react';
import { drawPlayingField, getPlayingFieldDimensions } from './utils';
import type { FC } from 'react';

type PlayingFieldProps = {
  onPlayingFieldResize: (nextSize: number) => void;
};

export const PlayingField: FC<PlayingFieldProps> = ({ onPlayingFieldResize }) => {
  const [size, setSize] = useState<number>(0);
  const [cellSize, setCellSize] = useState<number>(0);

  const canvasRef = useRef(null);

  useEffect(() => {
    const dimensions = getPlayingFieldDimensions(window.innerHeight, window.innerWidth);

    setSize(dimensions.field);
    setCellSize(dimensions.cell);

    onPlayingFieldResize(dimensions.field);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (size) {
      const dimensions = getPlayingFieldDimensions(window.innerHeight, window.innerWidth);
      drawPlayingField(canvasRef.current, dimensions);
    }
  }, [size]);

  useEffect(() => {
    const handleResize = ({ target }: Event) => {
      const { innerHeight, innerWidth } = target as Window;
      const dimensions = getPlayingFieldDimensions(innerHeight, innerWidth);

      setSize(dimensions.field);
      setCellSize(dimensions.cell);

      onPlayingFieldResize(dimensions.field);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onPlayingFieldResize]);

  return (
    <canvas
      height={String(size)}
      ref={canvasRef}
      style={{ background: 'white', borderRadius: cellSize / 2 }}
      width={String(size)}
    ></canvas>
  );
};
