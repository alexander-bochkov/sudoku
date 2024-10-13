import { forEachCell } from 'utils/board';
import type { Board, Cell } from 'types/board';
import type { Nullable } from 'types/utility-types';

export const findGaps = (board: Board): Cell[] => {
  const gaps: Cell[] = [];
  forEachCell(board, (cell, value) => !value && gaps.push(cell));
  return gaps;
};

export const getCellValue = (board: Board, cell: Cell): Nullable<number> => {
  const { columnIndex, rowIndex } = cell;
  return board[rowIndex][columnIndex];
};

export const setCellValue = (board: Board, cell: Cell, value: Nullable<number>): void => {
  const { columnIndex, rowIndex } = cell;
  board[rowIndex][columnIndex] = value;
};

export const createEmptyBoard = (): Board => Array.from({ length: 9 }, () => new Array(9).fill(null));

export const excludeCellAndCreateNewArray = (array: Array<Cell>, cell: Cell) => {
  const { columnIndex, rowIndex } = cell;
  return array.filter((item) => !(item.columnIndex === columnIndex && item.rowIndex === rowIndex));
};
