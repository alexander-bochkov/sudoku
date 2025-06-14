import type { Board, Cell, Matrix } from 'types/sudoku';

export const verifyBoard = (board: Board, matrix: Matrix) => {
  const verifiedBoard: Board = board.map((row, rowIdx) =>
    row.map((cell, colIdx): Cell => {
      if (cell.type !== 'solution') return cell;

      return cell.value === matrix[rowIdx][colIdx]
        ? {
            type: 'solved',
            value: cell.value,
          }
        : {
            notes: cell.notes,
            type: 'error',
            value: cell.value,
          };
    }),
  );

  const isSolved = verifiedBoard.every((row) => row.every(({ type }) => type === 'clue' || type === 'solved'));

  return { isSolved, verifiedBoard };
};
