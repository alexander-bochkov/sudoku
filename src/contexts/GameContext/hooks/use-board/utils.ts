import { CELLS_IN_ZONE, START_NUMBER, ZONES } from './constants';

import type { BoardMatrix, FullMatrix } from '../../types';
import type { Board, CellCoords, NumberRange } from 'types/board';

export const getCellIdxInZone = (cellIdx: number) => cellIdx % CELLS_IN_ZONE;

const getZoneIdx = (cellIdx: number) => Math.floor(cellIdx / CELLS_IN_ZONE);

export const generateBasicMatrix = () => {
  const emptyMartix = Array.from({ length: 9 }, () => new Array<null>(9).fill(null));

  const basicMatrix = emptyMartix.map((row, rowIdx) =>
    row.map((_, cellIdx) => {
      const zoneOffset = rowIdx % ZONES;
      const zoneCurrentIdx = getZoneIdx(cellIdx);
      const zoneTargetIdx = (zoneCurrentIdx + zoneOffset) % ZONES;

      const cellOffset = getZoneIdx(rowIdx);
      const cellCurrentIdxInZone = getCellIdxInZone(cellIdx);
      const cellTargetIdxInZone = (cellCurrentIdxInZone + cellOffset) % CELLS_IN_ZONE;

      return START_NUMBER + cellTargetIdxInZone + zoneTargetIdx * CELLS_IN_ZONE;
    }),
  ) as FullMatrix;

  return basicMatrix;
};

export const shuffle = (matrix: FullMatrix, steps: number) => {
  const getSecondaryRowIdx = (rowIdx: number) =>
    getCellIdxInZone(rowIdx) === CELLS_IN_ZONE - 1 ? rowIdx - 1 : rowIdx + 1;

  const findDuplicateIdx = (array: NumberRange[], prevIdx: number) =>
    array.findIndex((value, idx) => value === array[prevIdx] && idx !== prevIdx);

  const shuffleOnce = (a: NumberRange[], b: NumberRange[], idx: number) => {
    [b[idx], a[idx]] = [a[idx], b[idx]];
  };

  const shuffleStep = (a: NumberRange[], b: NumberRange[], idx: number, firstStep = false) => {
    const shuffleIdx = firstStep ? idx : findDuplicateIdx(a, idx);

    if (shuffleIdx !== -1) {
      shuffleOnce(a, b, shuffleIdx);
      shuffleStep(a, b, shuffleIdx);
    }
  };

  const vertical = (matrix: FullMatrix, step: number) => {
    if (!step) return matrix;

    const targetRowIdx = Math.floor(Math.random() * 9);
    const targetCellIdx = Math.floor(Math.random() * 9);

    const primaryRow = [...matrix[targetRowIdx]];

    const secondaryRowIdx = getSecondaryRowIdx(targetRowIdx);
    const secondaryRow = [...matrix[secondaryRowIdx]];

    shuffleStep(primaryRow, secondaryRow, targetCellIdx, true);

    const shuffledMatrix = matrix.map((row, rowIdx) => {
      if (rowIdx === targetRowIdx) return primaryRow;
      if (rowIdx === secondaryRowIdx) return secondaryRow;
      return row;
    });

    return vertical(shuffledMatrix, step - 1);
  };

  return vertical(matrix, steps);
};

export const convertMatrixToBoard = (matrix: BoardMatrix): Board =>
  matrix.map((row) => row.map((cell) => (cell ? { type: 'prefilled', value: cell } : cell)));

export const removeNumbers = (matrix: FullMatrix, quantity: number): BoardMatrix => {
  const shouldRemoveNumber = (removableNumbers: CellCoords[], rowIdx: number, cellIdx: number) =>
    removableNumbers.some((coords) => coords.rowIdx === rowIdx && coords.cellIdx === cellIdx);

  const generateRemovableNumbers = (quantity: number, removableNumbers: CellCoords[] = []) => {
    if (!quantity) return removableNumbers;

    const rowIdx = Math.floor(Math.random() * 9);
    const cellIdx = Math.floor(Math.random() * 9);

    if (shouldRemoveNumber(removableNumbers, rowIdx, cellIdx)) {
      return generateRemovableNumbers(quantity, removableNumbers);
    }

    removableNumbers.push({ rowIdx, cellIdx });
    return generateRemovableNumbers(quantity - 1, removableNumbers);
  };

  const removableNumbers = generateRemovableNumbers(quantity);

  return matrix.map((row, rowIdx) =>
    row.map((cell, cellIdx) => (shouldRemoveNumber(removableNumbers, rowIdx, cellIdx) ? null : cell)),
  );
};
