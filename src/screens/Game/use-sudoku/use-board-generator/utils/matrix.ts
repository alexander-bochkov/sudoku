import { BLOCK_SIZE } from '../constants';

import type { Matrix } from 'types/sudoku';

export const calculateBlockIdx = (idx: number) => Math.floor(idx / BLOCK_SIZE);

export const calculateLocalIdx = (idx: number) => idx % BLOCK_SIZE;

export const clone = (matrix: Matrix): Matrix => matrix.map((row) => [...row]);

export const flattenBlocks = (matrix: Matrix): Matrix =>
  matrix.map((row, rowIdx) =>
    row.map((_, colIdx) => {
      const blockIdxX = calculateBlockIdx(colIdx);
      const blockIdxY = calculateBlockIdx(rowIdx);

      const localIdxX = calculateLocalIdx(colIdx);
      const localIdxY = calculateLocalIdx(rowIdx);

      const nextRowIdx = blockIdxX + blockIdxY * BLOCK_SIZE;
      const nextColIdx = localIdxX + localIdxY * BLOCK_SIZE;

      return matrix[nextRowIdx][nextColIdx];
    }),
  );

export const transpose = (matrix: Matrix): Matrix =>
  matrix.map((row, rowIdx) => row.map((_, colIdx) => matrix[colIdx][rowIdx]));
