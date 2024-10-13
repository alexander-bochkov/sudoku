import type { Board } from 'types/board';

export const full: Board = [
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

export const prefilled: Board = [
  [1, 2, 4, 5, 6, 7, 8, 9, 3],
  [3, 7, null, 2, 9, 4, null, 1, 6],
  [6, 5, 9, 8, null, 1, 7, 4, 2],
  [9, 8, 7, 1, 2, 3, 4, 6, 5],
  [2, 3, 1, 4, 5, 6, 9, 7, 8],
  [5, 4, 6, 7, 8, 9, 3, 2, 1],
  [8, 6, 3, 9, 7, 2, 1, 5, 2],
  [4, 9, 5, 6, 1, 8, 2, 3, 7],
  [7, 1, 2, 3, 4, 5, 6, 8, 9],
];

export const template = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [2, 3, 1, 5, 6, 4, 8, 9, 7],
  [5, 6, 4, 8, 9, 7, 2, 3, 1],
  [8, 9, 7, 2, 3, 1, 5, 6, 5],
  [3, 1, 2, 6, 4, 5, 9, 7, 8],
  [6, 4, 5, 9, 7, 8, 3, 1, 2],
  [9, 7, 8, 3, 1, 2, 6, 4, 5],
];
