import { BLOCK_SIZE } from '../constants';

import type { Matrix } from 'types/sudoku';

export const getBlockIdx = (idx: number) => Math.floor(idx / BLOCK_SIZE);

export const getLocalIdx = (idx: number) => idx % BLOCK_SIZE;

export const clone = (matrix: Matrix): Matrix => matrix.map((row) => row.map((cell) => cell));

export const flattenBlocks = (matrix: Matrix): Matrix =>
  matrix.map((row, rowIdx) =>
    row.map((_, colIdx) => {
      const blockIdxX = getBlockIdx(colIdx);
      const blockIdxY = getBlockIdx(rowIdx);

      const localIdxX = getLocalIdx(colIdx);
      const localIdxY = getLocalIdx(rowIdx);

      const nextRowIdx = blockIdxX + blockIdxY * BLOCK_SIZE;
      const nextColIdx = localIdxX + localIdxY * BLOCK_SIZE;

      return matrix[nextRowIdx][nextColIdx];
    }),
  );

export const rotate = (matrix: Matrix): Matrix =>
  matrix.map((row, rowIdx) => row.map((_, colIdx) => matrix[colIdx][rowIdx]));
