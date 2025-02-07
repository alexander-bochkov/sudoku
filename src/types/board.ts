import type { Nullable } from './utility-types';

export type Board = Nullable<Cell>[][];

export type Cell = {
  type: 'correct' | 'error' | 'prefilled' | 'solution';
  value: NumberRange;
};

export type Coords = {
  rowIdx: number;
  cellIdx: number;
};

export type NumberRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
