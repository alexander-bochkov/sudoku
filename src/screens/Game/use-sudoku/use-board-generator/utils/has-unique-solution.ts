import { BLOCK_SIZE, BOARD_SIZE } from '../constants';

import { calculateBlockIdx, flattenBlocks, transpose } from './matrix';

import type { Digit, Matrix } from 'types/sudoku';

const hasDigitInRow = (matrix: Matrix, rowIdx: number, digit: Digit) => matrix[rowIdx].some((value) => value === digit);

const hasDigitInColumn = (matrix: Matrix, colIdx: number, digit: Digit) => {
  const columns = transpose(matrix);
  return columns[colIdx].some((value) => value === digit);
};

const hasDigitInBlock = (matrix: Matrix, rowIdx: number, colIdx: number, digit: Digit) => {
  const blocks = flattenBlocks(matrix);

  const blockIdxX = calculateBlockIdx(colIdx);
  const blockIdxY = calculateBlockIdx(rowIdx);

  const searchIdx = blockIdxX + blockIdxY * BLOCK_SIZE;
  return blocks[searchIdx].some((value) => value === digit);
};

const isDigitValid = (matrix: Matrix, rowIdx: number, colIdx: number, digit: Digit) =>
  !hasDigitInRow(matrix, rowIdx, digit) &&
  !hasDigitInColumn(matrix, colIdx, digit) &&
  !hasDigitInBlock(matrix, rowIdx, colIdx, digit);

export const hasUniqueSolution = (matrix: Matrix) => {
  let solutions = 0;

  const solve = (matrix: Matrix) => {
    for (let rowIdx = 0; rowIdx < BOARD_SIZE; rowIdx++) {
      for (let colIdx = 0; colIdx < BOARD_SIZE; colIdx++) {
        if (matrix[rowIdx][colIdx]) continue;

        for (let digit = 1; digit <= BOARD_SIZE; digit++) {
          if (!isDigitValid(matrix, rowIdx, colIdx, digit as Digit)) continue;

          matrix[rowIdx][colIdx] = digit as Digit;

          if (solve(matrix)) return true;

          matrix[rowIdx][colIdx] = null;
        }

        return false;
      }
    }

    solutions++;
    return solutions > 1;
  };

  solve(matrix);
  return solutions === 1;
};
