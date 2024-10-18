import { useContext } from 'react';
import { ScreenContext } from './context';
import type { ScreenContextType } from './context';

export const useScreenContext = (): ScreenContextType => {
  const context = useContext(ScreenContext);

  if (!context) {
    throw new Error('useScreenContext cannot return context');
  }

  return context;
};
