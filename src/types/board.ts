import type { Nullable } from './utility-types';

export type Board_OLD = Nullable<number>[][];

export interface Cell_OLD {
  columnIndex: number;
  rowIndex: number;
}

export interface Dimensions {
  board: number;
  cell: number;
  zone: number;
}

export type Board = Nullable<Cell>[][];

export interface Cell {
  type: 'correct' | 'error' | 'prefilled' | 'solution';
  value: NumberRange;
}

export type NumberRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface Coords {
  cellIdx: number;
  rowIdx: number;
}
