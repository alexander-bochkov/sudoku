import { createContext, useContext } from 'react';
import type { Dimensions } from 'types/playing-field';

export type PlayingFieldDimensionsContextType = {
  dimensions: Dimensions | null;
};

export const PlayingFieldDimensionsContext = createContext<PlayingFieldDimensionsContextType | null>(null);

export const usePlayingFieldDimensions = (): PlayingFieldDimensionsContextType => {
  const context = useContext(PlayingFieldDimensionsContext);

  if (!context) {
    throw new Error('usePlayingFieldDimensions cannot return context');
  }

  return context;
};
