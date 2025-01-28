import { useMemo } from 'react';
import { SHUFFLE_STEPS } from './constants';
import { generateBasicMatrix, shuffle } from './utils';

export const useBoard = () => {
  const basicMatrix = useMemo(() => generateBasicMatrix(), []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const shuffledMatrix = useMemo(() => shuffle(basicMatrix, SHUFFLE_STEPS), [basicMatrix]);

  return {};
};
