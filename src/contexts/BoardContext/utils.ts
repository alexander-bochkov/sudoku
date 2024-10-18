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

    setCellValue(board, { columnIndex: realColumnIndex, rowIndex }, value);
  });

  return board;
};

const checkNumber = (fragment: Nullable<number>[], maxNumber: number, number = 1): boolean => {
  if (number > maxNumber) return true;
  return fragment.indexOf(number) === -1 ? false : checkNumber(fragment, maxNumber, ++number);
};

export const validateBoardFragment =
  (fragmentType: string) =>
  (fragment: Nullable<number>[], fragmentIndex: number): boolean => {
    const maxNumber = CELLS_IN_ZONE_ON_AXIS * ZONES_ON_AXIS;

    const hasCorrectLength = fragment.length === maxNumber;

    if (!hasCorrectLength) {
      console.error(`Board ${fragmentType} with index ${fragmentIndex} validation error, rule "hasCorrectLength"`);
      return false;
    }

    const hasValidNumbers = fragment.every((element) => element && element <= maxNumber);

    if (!hasValidNumbers) {
      console.error(`Board ${fragmentType} with index ${fragmentIndex} validation error, rule "hasValidNumbers"`);
      return false;
    }

    const hasAllNumbers = checkNumber(fragment, maxNumber);

    if (!hasAllNumbers) {
      console.error(`Board ${fragmentType} with index ${fragmentIndex} validation error, rule "hasAllNumbers"`);
      return false;
    }

    return true;
  };

const validateRows = (board: Board): boolean => board.every(validateBoardFragment('row'));

const validateColumns = (board: Board): boolean => {
  const columns = createEmptyBoard();

  forEachCell(board, ({ columnIndex, rowIndex }, value) => {
    setCellValue(columns, { columnIndex: rowIndex, rowIndex: columnIndex }, value);
  });

  return columns.every(validateBoardFragment('column'));
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

    setCellValue(zones, { columnIndex: realColumnIndex, rowIndex: realRowIndex }, value);
  });

  return zones.every(validateBoardFragment('zone'));
};

export const validateBoard = (board: Board) => validateRows(board) && validateColumns(board) && validateZones(board);

const shuffleHorizontal = (board: Board, repeat = 1) => {
  if (!repeat) return;

  const maxNumber = CELLS_IN_ZONE_ON_AXIS * ZONES_ON_AXIS;

  const row = Math.floor(Math.random() * maxNumber);
  const column = Math.floor(Math.random() * maxNumber);

  forEachCell(board, ({ columnIndex, rowIndex }, basicValue) => {
    if (rowIndex === row && columnIndex === column) {
      const zoneIndexY = getZoneIndex(rowIndex, CELLS_IN_ZONE_ON_AXIS);
      const cellIndexInZoneY = getIndexInZone(rowIndex, CELLS_IN_ZONE_ON_AXIS, zoneIndexY);

      const canBeShuffledWithValueBelow = cellIndexInZoneY !== 2;
      const rowIndexToShuffle = canBeShuffledWithValueBelow ? rowIndex + 1 : rowIndex - 1;

      const shuffleValue = getCellValue(board, { columnIndex, rowIndex: rowIndexToShuffle });

      const columnIndexOfSecondBasicValue = board[rowIndex].indexOf(shuffleValue);
      const secondBasicValue = getCellValue(board, { columnIndex: columnIndexOfSecondBasicValue, rowIndex });
      const secondShuffleValue = getCellValue(board, {
        columnIndex: columnIndexOfSecondBasicValue,
        rowIndex: rowIndexToShuffle,
      });

      const columnIndexOfThirdBasicValue = board[rowIndex].indexOf(secondShuffleValue);
      const thirdBasicValue = getCellValue(board, { columnIndex: columnIndexOfThirdBasicValue, rowIndex });
      const thirdShuffleValue = getCellValue(board, {
        columnIndex: columnIndexOfThirdBasicValue,
        rowIndex: rowIndexToShuffle,
      });

      setCellValue(board, { columnIndex, rowIndex }, shuffleValue);
      setCellValue(board, { columnIndex, rowIndex: rowIndexToShuffle }, basicValue);

      setCellValue(board, { columnIndex: columnIndexOfSecondBasicValue, rowIndex }, secondShuffleValue);
      setCellValue(
        board,
        { columnIndex: columnIndexOfSecondBasicValue, rowIndex: rowIndexToShuffle },
        secondBasicValue,
      );

      setCellValue(board, { columnIndex: columnIndexOfThirdBasicValue, rowIndex }, thirdShuffleValue);
      setCellValue(board, { columnIndex: columnIndexOfThirdBasicValue, rowIndex: rowIndexToShuffle }, thirdBasicValue);
    }
  });

  shuffleHorizontal(board, --repeat);
};

const cloneBoard = (board: Board): Board => {
  const nextBoard = createEmptyBoard();

  forEachCell(board, ({ columnIndex, rowIndex }, value) => {
    setCellValue(nextBoard, { columnIndex, rowIndex }, value);
  });

  return nextBoard;
};

export const shuffleBoard = (board: Board): Board => {
  const nextBoard = cloneBoard(board);
  shuffleHorizontal(nextBoard, 81);
  return nextBoard;
};

export const removeNumbers = (board: Board, removeNumbersQuantiry: number): Board => {
  if (!removeNumbersQuantiry) return board;

  const nextBoard = cloneBoard(board);

  const maxNumber = CELLS_IN_ZONE_ON_AXIS * ZONES_ON_AXIS;

  const rowIndex = Math.floor(Math.random() * maxNumber);
  const columnIndex = Math.floor(Math.random() * maxNumber);

  if (getCellValue(nextBoard, { columnIndex, rowIndex })) {
    setCellValue(nextBoard, { columnIndex, rowIndex }, null);
    return removeNumbers(nextBoard, --removeNumbersQuantiry);
  } else {
    return removeNumbers(nextBoard, removeNumbersQuantiry);
  }
};
