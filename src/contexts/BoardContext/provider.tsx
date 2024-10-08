import { useEffect, useMemo, useState } from 'react';
import { BoardContext } from './context';
import { getDimensions } from './utils/get-dimensions';
import type { FC, PropsWithChildren } from 'react';
import type { BoardContextType } from './context';

export const BoardContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [board, setBoard] = useState<BoardContextType['board']>(null);
  const [dimensions, setDimensions] = useState<BoardContextType['dimensions']>(null);

  useEffect(() => {
    const nextDimensions = getDimensions(window.innerWidth, window.innerHeight);
    setDimensions(nextDimensions);

    // TODO: Remove
    setBoard(null);
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

  const value = useMemo<BoardContextType>(
    () => ({
      board,
      dimensions,
    }),
    [board, dimensions],
  );

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
};
