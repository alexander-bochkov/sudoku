import { useEffect, useState } from 'react';
import { getPlayingFieldDimensions } from './utils';

export const PlayingField = () => {
  const { field } = getPlayingFieldDimensions(window.innerHeight, window.innerWidth);

  const [size, setSize] = useState<number>(field);

  useEffect(() => {
    const handleResize = ({ target }: Event) => {
      const { innerHeight, innerWidth } = target as Window;
      const { field } = getPlayingFieldDimensions(innerHeight, innerWidth);
      setSize(field);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas height={String(size)} width={String(size)} style={{ background: 'white' }}></canvas>;
};
