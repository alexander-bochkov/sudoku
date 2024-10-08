import { createContext, useContext } from 'react';
import type { Dimensions, Sudoku } from 'types/playing-field';

export type PlayingFieldContextType = {
  dimensions: Dimensions | null;
  sudoku: Sudoku | null;
};

export const PlayingFieldContext = createContext<PlayingFieldContextType | null>(null);

export const usePlayingField = (): PlayingFieldContextType => {
  const context = useContext(PlayingFieldContext);

  if (!context) {
    throw new Error('usePlayingField cannot return context');
  }

  return context;
};
