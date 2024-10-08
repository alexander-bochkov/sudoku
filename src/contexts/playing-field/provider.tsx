import { useEffect, useMemo, useState } from 'react';
import { sudoku as data } from '../../test-data';
import { PlayingFieldContext } from './context';
import { calculatePlayingFieldDimensions } from './utils';
import type { FC, PropsWithChildren } from 'react';
import type { PlayingFieldContextType } from './context';

export const PlayingFieldProvider: FC<PropsWithChildren> = ({ children }) => {
  const [dimensions, setDimensions] = useState<PlayingFieldContextType['dimensions']>(null);
  const [sudoku, setSudoku] = useState<PlayingFieldContextType['sudoku']>(null);

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

  useEffect(() => {
    setSudoku(data);
  }, []);

  const value: PlayingFieldContextType = useMemo(() => ({ dimensions, sudoku }), [dimensions, sudoku]);

  return <PlayingFieldContext.Provider value={value}>{children}</PlayingFieldContext.Provider>;
};
