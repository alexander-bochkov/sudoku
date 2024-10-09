import { useEffect, useMemo, useState } from 'react';
import { board as boardData } from '../../data/board';
import { BoardContext } from './context';
import { getDimensions } from './utils';
import type { FC, PropsWithChildren } from 'react';
import type { BoardContextType } from './context';

export const BoardContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [board, setBoard] = useState<BoardContextType['board']>(null);
  const [dimensions, setDimensions] = useState<BoardContextType['dimensions']>(null);

  useEffect(() => {
    setBoard(boardData);
  }, []);

  useEffect(() => {
    const nextDimensions = getDimensions(window.innerWidth, window.innerHeight);
    setDimensions(nextDimensions);
  }, []);

  useEffect(() => {
    const handleResize = ({ target }: Event) => {
      const { innerWidth, innerHeight } = target as Window;
      const nextDimensions = getDimensions(innerWidth, innerHeight);
      setDimensions((prevDimensions) =>
        prevDimensions?.board !== nextDimensions.board ? nextDimensions : prevDimensions,
      );
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const value = useMemo(
    () => ({
      board,
      dimensions,
    }),
    [board, dimensions],
  );

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
};
