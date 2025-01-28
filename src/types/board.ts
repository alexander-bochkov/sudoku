import type { Nullable } from './utility-types';

export type Board = Nullable<Cell>[][];

export interface Cell {
  type: 'correct' | 'error' | 'prefilled' | 'solution';
  value: NumberRange;
}

export type NumberRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface CellCoords {
  rowIdx: number;
  cellIdx: number;
}
