import { useContext } from 'react';

import { GameContext } from './context';

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGameContext cannot return context');
  }

  return context;
};
