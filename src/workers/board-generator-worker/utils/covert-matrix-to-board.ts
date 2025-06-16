import type { Board, Cell, Matrix, Note } from 'types/sudoku';

export const covertMatrixToBoard = (matrix: Matrix): Board =>
  matrix.map((row) =>
    row.map(
      (value): Cell =>
        value
          ? {
              type: 'clue',
              value,
            }
          : {
              notes: Array<Note>(9).fill(null),
              type: 'empty',
              value,
            },
    ),
  );
