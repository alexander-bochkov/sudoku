import type { Nullable } from './utility-types';

export type Board = Nullable<number>[][];

export interface Cell {
  columnIndex: number;
  rowIndex: number;
}

export interface Dimensions {
  board: number;
  cell: number;
  zone: number;
}

export type NumberRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
