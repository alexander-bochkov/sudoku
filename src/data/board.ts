import type { Board } from 'types/board';

const full: Board = [
  [1, 2, 4, 5, 6, 7, 8, 9, 3],
  [3, 7, 8, 2, 9, 4, 5, 1, 6],
  [6, 5, 9, 8, 3, 1, 7, 4, 2],
  [9, 8, 7, 1, 2, 3, 4, 6, 5],
  [2, 3, 1, 4, 5, 6, 9, 7, 8],
  [5, 4, 6, 7, 8, 9, 3, 2, 1],
  [8, 6, 3, 9, 7, 2, 1, 5, 2],
  [4, 9, 5, 6, 1, 8, 2, 3, 7],
  [7, 1, 2, 3, 4, 5, 6, 8, 9],
];

const prefilled: Board = [
  [1, 2, 4, 5, 6, 7, 8, 9, 3],
  [3, null, null, 2, 9, 4, null, 1, 6],
  [6, 5, null, 8, 3, null, 7, 4, 2],
  [9, 8, 7, 1, 2, 3, 4, 6, 5],
  [2, null, 1, 4, 5, null, 9, null, 8],
  [5, 4, 6, null, null, null, 3, 2, 1],
  [8, 6, 3, 9, null, 2, 1, 5, 2],
  [4, null, 5, 6, 1, 8, null, 3, 7],
  [7, 1, null, 3, 4, null, 6, 8, 9],
];

const solution: Board = [
  [null, null, null, null, null, null, null, null, null],
  [null, 7, 8, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
];

const errors: Board = [
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, 7, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
];

export const board = {
  full,
  prefilled,
  solution,
  errors,
};
