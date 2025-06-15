import { BOARD_SIZE, CELLS_COUNT } from '../constants';

import { hasUniqueSolution } from './has-unique-solution';
import { clone } from './matrix';

import type { Matrix } from 'types/sudoku';

export const createClues = (matrix: Matrix, cluesCount: number) => {
  const clues = clone(matrix);

  const emptyCount = CELLS_COUNT - cluesCount;

  for (let i = 0; i < emptyCount; i++) {
    const rowIdx = Math.floor(Math.random() * BOARD_SIZE);
    const colIdx = Math.floor(Math.random() * BOARD_SIZE);

    if (!clues[rowIdx][colIdx]) {
      i -= 1;
      continue;
    }

    const value = clues[rowIdx][colIdx];

    clues[rowIdx][colIdx] = null;

    if (!hasUniqueSolution(clone(clues))) {
      clues[rowIdx][colIdx] = value;
      i -= 1;
    }
  }

  return clues;
};
