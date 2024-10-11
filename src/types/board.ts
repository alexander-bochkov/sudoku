import type { Nullable } from './utility-types';

export type Board = Nullable<number>[][];

export type BoardVariant = 'errors' | 'full' | 'prefilled' | 'solution';

export type Cell = {
  columnIndex: number;
  rowIndex: number;
};

export type Dimensions = {
  board: number;
  zone: number;
  cell: number;
};
