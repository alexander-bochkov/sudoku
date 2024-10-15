import { forEachCell, getIndexInZone, getZoneIndex } from 'utils/board';
import { CELLS_IN_ZONE_ON_AXIS, ZONES_ON_AXIS } from 'constants/board';
import { OFFSET_STEP } from './constants';
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

export const createTemplateBoard = (): Board => {
  const maxNumber = CELLS_IN_ZONE_ON_AXIS * ZONES_ON_AXIS;

  const board = createEmptyBoard();

  forEachCell(board, ({ columnIndex, rowIndex }) => {
    const zoneIndexX = getZoneIndex(columnIndex, CELLS_IN_ZONE_ON_AXIS);
    const zoneIndexY = getZoneIndex(rowIndex, CELLS_IN_ZONE_ON_AXIS);

    const cellIndexInZoneX = getIndexInZone(columnIndex, CELLS_IN_ZONE_ON_AXIS, zoneIndexX);

    const zoneStartPoint = ZONES_ON_AXIS * rowIndex * OFFSET_STEP;
    const zoneOffset = ZONES_ON_AXIS * zoneIndexX;
    const zonePosition = (zoneStartPoint + zoneOffset) % maxNumber;

    const cellPosition = (cellIndexInZoneX + zoneIndexY * OFFSET_STEP) % CELLS_IN_ZONE_ON_AXIS;

    const realColumnIndex = zonePosition + cellPosition;

    const value = columnIndex + 1;

    board[rowIndex][realColumnIndex] = value;
  });

  return board;
};

const checkNumber = (fragment: Nullable<number>[], maxNumber: number, number = 1): boolean => {
  if (number > maxNumber) return true;
  return fragment.indexOf(number) === -1 ? false : checkNumber(fragment, maxNumber, ++number);
};

export const validateBoardFragment = (fragment: Nullable<number>[]): boolean => {
  const maxNumber = CELLS_IN_ZONE_ON_AXIS * ZONES_ON_AXIS;

  const hasCorrectLength = fragment.length === maxNumber;
  const hasValidNumbers = fragment.every((element) => element && element <= maxNumber);
  const hasAllNumbers = checkNumber(fragment, maxNumber);

  return hasCorrectLength && hasValidNumbers && hasAllNumbers;
};

const validateRows = (board: Board): boolean => board.every(validateBoardFragment);

const validateColumns = (board: Board): boolean => {
  const columns = createEmptyBoard();

  forEachCell(board, ({ columnIndex, rowIndex }, value) => {
    columns[columnIndex][rowIndex] = value;
  });

  return columns.every(validateBoardFragment);
};

const validateZones = (board: Board): boolean => {
  const zones = createEmptyBoard();

  forEachCell(board, ({ columnIndex, rowIndex }, value) => {
    const zoneIndexX = getZoneIndex(columnIndex, CELLS_IN_ZONE_ON_AXIS);
    const zoneIndexY = getZoneIndex(rowIndex, CELLS_IN_ZONE_ON_AXIS);

    const cellIndexInZoneX = getIndexInZone(columnIndex, CELLS_IN_ZONE_ON_AXIS, zoneIndexX);
    const cellIndexInZoneY = getIndexInZone(rowIndex, CELLS_IN_ZONE_ON_AXIS, zoneIndexY);

    const realRowIndex = zoneIndexX + ZONES_ON_AXIS * zoneIndexY;
    const realColumnIndex = cellIndexInZoneX + CELLS_IN_ZONE_ON_AXIS * cellIndexInZoneY;

    zones[realRowIndex][realColumnIndex] = value;
  });

  return zones.every(validateBoardFragment);
};

export const validateBoard = (board: Board) => validateRows(board) && validateColumns(board) && validateZones(board);
