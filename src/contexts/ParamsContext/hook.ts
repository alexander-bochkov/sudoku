import { useContext } from 'react';

import { ParamsContext } from './context';

export const useParamsContext = () => {
  const context = useContext(ParamsContext);

  if (!context) {
    throw new Error('useParamsContext cannot return context');
  }

  return context;
};
