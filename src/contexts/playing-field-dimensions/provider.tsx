import { useEffect, useMemo, useState } from 'react';
import { PlayingFieldDimensionsContext } from './context';
import { calculatePlayingFieldDimensions } from './utils';
import type { FC, PropsWithChildren } from 'react';
import type { PlayingFieldDimensionsContextType } from './context';

export const PlayingFieldDimensionsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [dimensions, setDimensions] = useState<PlayingFieldDimensionsContextType['dimensions']>(null);

  useEffect(() => {
    const dimensions = calculatePlayingFieldDimensions(window.innerWidth, window.innerHeight);
    setDimensions(dimensions);
  }, []);

  useEffect(() => {
    const handleResize = ({ target }: Event) => {
      const { innerWidth, innerHeight } = target as Window;
      const dimensions = calculatePlayingFieldDimensions(innerWidth, innerHeight);
      setDimensions((prevDimension) => (prevDimension?.field !== dimensions.field ? dimensions : prevDimension));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const value: PlayingFieldDimensionsContextType = useMemo(() => ({ dimensions }), [dimensions]);

  return <PlayingFieldDimensionsContext.Provider value={value}>{children}</PlayingFieldDimensionsContext.Provider>;
};
