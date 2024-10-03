import { useEffect, useState } from 'react';
import { getPlayingFieldDimensions } from './utils';
import type { FC } from 'react';

type PlayingFieldProps = {
  onPlayingFieldResize: (nextSize: number) => void;
};

export const PlayingField: FC<PlayingFieldProps> = ({ onPlayingFieldResize }) => {
  const [size, setSize] = useState<number>(0);
  const [cellSize, setCellSize] = useState<number>(0);

  useEffect(() => {
    const { cell, field } = getPlayingFieldDimensions(window.innerHeight, window.innerWidth);

    setSize(field);
    setCellSize(cell);

    onPlayingFieldResize(field);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleResize = ({ target }: Event) => {
      const { innerHeight, innerWidth } = target as Window;
      const { cell, field } = getPlayingFieldDimensions(innerHeight, innerWidth);

      setSize(field);
      setCellSize(cell);

      onPlayingFieldResize(field);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onPlayingFieldResize]);

  return (
    <canvas
      height={String(size)}
      width={String(size)}
      style={{ background: 'white', borderRadius: cellSize / 2 }}
    ></canvas>
  );
};
