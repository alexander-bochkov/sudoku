import { useMemo } from 'react';
import { REMOVE_NUMBERS_QUANTITY, SHUFFLE_STEPS } from './constants';
import { convertMatrixToBoard, generateBasicMatrix, removeNumbers, shuffle } from './utils';

export const useBoard = () => {
  const basicMatrix = useMemo(() => generateBasicMatrix(), []);
  const shuffledMatrix = useMemo(() => shuffle(basicMatrix, SHUFFLE_STEPS), [basicMatrix]);
  const preparedMatrix = useMemo(() => removeNumbers(shuffledMatrix, REMOVE_NUMBERS_QUANTITY), [shuffledMatrix]);
  const board = useMemo(() => convertMatrixToBoard(preparedMatrix), [preparedMatrix]);

  return useMemo(() => ({ board }), [board]);
};
