import { useState } from 'react';

import { MATRIX_TEMPLATE, SHUFFLE_STEPS } from './constants';
import { convertMatrixToBoard, removeNumbers, shuffle } from './utils';

import type { Matrix } from './types';
import type { Board, Cell, Coords, Difficulty } from 'types/board';
import type { Nullable } from 'types/utility-types';

const DIFFICULTIES: Record<Difficulty, number> = {
  easy: 30,
  medium: 40,
  hard: 50,
};

export const useBoard = () => {
  const [board, setBoard] = useState<Nullable<Board>>(null);
  const [matrix, setMatrix] = useState<Nullable<Matrix>>(null);

  const createBoard = (difficulty: Difficulty) => {
    const matrix = shuffle(MATRIX_TEMPLATE, SHUFFLE_STEPS);
    const prefilledMatrix = removeNumbers(matrix, DIFFICULTIES[difficulty]);
    const board = convertMatrixToBoard(prefilledMatrix);

    setBoard(board);
    setMatrix(matrix);
  };

  const setCell = (updatedCell: Cell, coords: Coords) => {
    setBoard((prevBoard) => {
      if (!prevBoard) return prevBoard;

      return prevBoard.map((row, rowIdx) =>
        row.map((cell, cellIdx) => {
          const shouldUpdateCell = rowIdx === coords.rowIdx && cellIdx === coords.cellIdx;
          return shouldUpdateCell ? updatedCell : cell;
        }),
      );
    });
  };

  return { board, createBoard, matrix, setBoard, setCell };
};
