import type { Nullable } from './utility-types';

export type NumberRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Suggestions = Nullable<NumberRange>[];

export type Cell = {
  suggestions?: Suggestions;
  type?: 'correct' | 'error' | 'prefilled' | 'solution';
  value: Nullable<NumberRange>;
};

export type Board = Cell[][];

export type Coords = {
  rowIdx: number;
  cellIdx: number;
};

export type Difficulty = 'easy' | 'medium' | 'hard';

export type SelectedCell = {
  cell: Cell;
  coords: Coords;
};
