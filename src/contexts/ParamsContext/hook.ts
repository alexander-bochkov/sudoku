import { useContext } from 'react';
import { ParamsContext } from './context';
import type { ParamsContextType } from './context';

export const useParamsContext = (): ParamsContextType => {
  const context = useContext(ParamsContext);

  if (!context) {
    throw new Error('useParamsContext cannot return context');
  }

  return context;
};
