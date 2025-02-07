import { useState } from 'react';

import { MATRIX_TEMPLATE, REMOVE_NUMBERS_QUANTITY, SHUFFLE_STEPS } from './constants';
import { convertMatrixToBoard, removeNumbers, shuffle } from './utils';

import type { Matrix } from './types';
import type { Board, Cell, Coords } from 'types/board';
import type { Nullable } from 'types/utility-types';

export const useBoard = () => {
  const [board, setBoard] = useState<Nullable<Board>>(null);
  const [matrix, setMatrix] = useState<Nullable<Matrix>>(null);

  const createBoard = () => {
    const matrix = shuffle(MATRIX_TEMPLATE, SHUFFLE_STEPS);
    const prefilledMatrix = removeNumbers(matrix, REMOVE_NUMBERS_QUANTITY);
    const board = convertMatrixToBoard(prefilledMatrix);

    setBoard(board);
    setMatrix(matrix);
  };

  const setCell = (coords: Coords, value: Nullable<Cell>) => {
    setBoard((prevBoard) => {
      if (!prevBoard) return prevBoard;

      return prevBoard.map((row, rowIdx) =>
        row.map((cell, cellIdx) => {
          const shouldUpdateCell = rowIdx === coords.rowIdx && cellIdx === coords.cellIdx;
          return shouldUpdateCell ? value : cell;
        }),
      );
    });
  };

  return { board, createBoard, matrix, setBoard, setCell };
};
