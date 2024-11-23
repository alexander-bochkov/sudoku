import type { Nullable } from './utility-types';

export type Board = Nullable<number>[][];

export interface Cell {
  columnIndex: number;
  rowIndex: number;
}

export interface Dimensions {
  board: number;
  zone: number;
  cell: number;
}
