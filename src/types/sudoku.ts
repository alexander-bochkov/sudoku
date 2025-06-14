import type { Nullable } from './utility-types';

export type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Note = Nullable<Digit>;

type Clue = {
  type: 'clue';
  value: Digit;
};

type Empty = {
  notes: Note[];
  type: 'empty';
  value: null;
};

type Error = {
  notes: Note[];
  type: 'error';
  value: Digit;
};

type Solution = {
  notes: Note[];
  type: 'solution';
  value: Digit;
};

type Solved = {
  type: 'solved';
  value: Digit;
};

export type Cell = Clue | Empty | Error | Solution | Solved;

export type Board = Cell[][];

export type Coordinates = {
  rowIdx: number;
  colIdx: number;
};

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Matrix = Nullable<Digit>[][];
