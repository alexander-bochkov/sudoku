import type { Board, Matrix } from 'types/sudoku';

export const covertToBoard = (matrix: Matrix): Board =>
  matrix.map((row) =>
    row.map((value) =>
      value
        ? {
            type: 'clue',
            value,
          }
        : {
            notes: [],
            type: 'empty',
            value,
          },
    ),
  );
