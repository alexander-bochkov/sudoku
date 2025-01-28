import { useMemo } from 'react';
import { SHUFFLE_STEPS } from './constants';
import { convertMatrixToBoard, generateBasicMatrix, shuffle } from './utils';

export const useBoard = () => {
  const basicMatrix = useMemo(() => generateBasicMatrix(), []);
  const shuffledMatrix = useMemo(() => shuffle(basicMatrix, SHUFFLE_STEPS), [basicMatrix]);
  const board = useMemo(() => convertMatrixToBoard(shuffledMatrix), [shuffledMatrix]);

  return useMemo(() => ({ board }), [board]);
};
