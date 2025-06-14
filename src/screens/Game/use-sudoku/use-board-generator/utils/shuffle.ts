import { BLOCK_SIZE, BOARD_SIZE } from '../constants';

import { calculateBlockIdx, calculateLocalIdx, clone, transpose } from './matrix';

import type { Matrix } from 'types/sudoku';

const findDuplicateIdx = (row: Matrix[number], searchIdx: number) =>
  row.findIndex((value, idx) => value === row[searchIdx] && searchIdx !== idx);

const swap = (rowA: Matrix[number], rowB: Matrix[number], idx: number) => {
  [rowB[idx], rowA[idx]] = [rowA[idx], rowB[idx]];
};

const shuffleRows = (rowA: Matrix[number], rowB: Matrix[number], idx: number, firstSwap = false) => {
  const swapIdx = firstSwap ? idx : findDuplicateIdx(rowA, idx);

  if (swapIdx === -1) return;

  swap(rowA, rowB, swapIdx);
  shuffleRows(rowA, rowB, swapIdx);
};

const getSecondRowIdx = (rowIdx: number) => {
  const nextRowIdx = rowIdx + 1;
  const nextLocalIdx = calculateLocalIdx(nextRowIdx);

  const blockIdx = calculateBlockIdx(rowIdx);
  const offset = blockIdx * BLOCK_SIZE;

  return nextLocalIdx + offset;
};

export const shuffle = (template: Matrix, swaps: number) => {
  let matrix = clone(template);

  for (let i = 0; i < swaps; i++) {
    const shouldShuffleColumns = Boolean(Math.floor(Math.random() * 2));

    shouldShuffleColumns && (matrix = transpose(matrix));

    const rowIdx = Math.floor(Math.random() * BOARD_SIZE);
    const colIdx = Math.floor(Math.random() * BOARD_SIZE);

    const firstRow = matrix[rowIdx];
    const secondRow = matrix[getSecondRowIdx(rowIdx)];

    shuffleRows(firstRow, secondRow, colIdx, true);

    shouldShuffleColumns && (matrix = transpose(matrix));
  }

  return matrix;
};
