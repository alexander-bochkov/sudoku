import { useContext } from 'react';
import { BoardContext } from './context';
import type { BoardContextType } from './context';

export const useBoardContext = (): BoardContextType => {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error('useBoardContext cannot return context');
  }

  return context;
};
