import type { Nullable } from './utility-types';

export type NumberRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Cell = {
  type: 'correct' | 'error' | 'prefilled' | 'solution';
  value: NumberRange;
};

export type Board = Nullable<Cell>[][];

export type Coords = {
  rowIdx: number;
  cellIdx: number;
};

export type Difficulty = 'easy' | 'medium' | 'hard';
