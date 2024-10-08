import type { Nullable } from './utility-types';

export type Board = Nullable<number>[][];

export type Dimensions = {
  board: number;
  zone: number;
  cell: number;
};
