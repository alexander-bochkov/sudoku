import { CELLS_IN_ZONE, CELLS_ON_AXIS } from './constants';

import type { Matrix, PrefilledMatrix, ShuffleDirection } from './types';
import type { Board, Coords, NumberRange } from 'types/board';

export const convertMatrixToBoard = (matrix: PrefilledMatrix): Board =>
  matrix.map((row) => row.map((cell) => (cell ? { type: 'prefilled', value: cell } : cell)));

export const removeNumbers = (matrix: Matrix, quantity: number): PrefilledMatrix => {
  const shouldRemoveNumber = (removableNumbers: Coords[], rowIdx: number, cellIdx: number) =>
    removableNumbers.some((coords) => coords.rowIdx === rowIdx && coords.cellIdx === cellIdx);

  const generateRemovableNumbers = (quantity: number, removableNumbers: Coords[] = []) => {
    if (!quantity) return removableNumbers;

    const rowIdx = Math.floor(Math.random() * CELLS_ON_AXIS);
    const cellIdx = Math.floor(Math.random() * CELLS_ON_AXIS);

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

export const shuffle = (matrix: Matrix, steps: number) => {
  const calculateLocalIdx = (idx: number) => idx % CELLS_IN_ZONE;
  const calculateZoneIdx = (idx: number) => Math.floor(idx / CELLS_IN_ZONE);

  const flipMatrix = (matrix: Matrix) => matrix.map((row, rowIdx) => row.map((_, cellIdx) => matrix[cellIdx][rowIdx]));

  const getSecondaryRowIdx = (primaryRowIdx: number) => {
    const nextRowIdx = primaryRowIdx + 1;
    const nextLocalRowIdx = calculateLocalIdx(nextRowIdx);

    const zoneIdx = calculateZoneIdx(primaryRowIdx);
    const rowIdxOffset = zoneIdx * CELLS_IN_ZONE;

    return nextLocalRowIdx + rowIdxOffset;
  };

  const findDuplicateIdx = (row: NumberRange[], targetIdx: number) =>
    row.findIndex((value, idx) => value === row[targetIdx] && idx !== targetIdx);

  const shuffleOnce = (rowA: NumberRange[], rowB: NumberRange[], idx: number) => {
    [rowB[idx], rowA[idx]] = [rowA[idx], rowB[idx]];
  };

  const shuffleRows = (primaryRow: NumberRange[], secondaryRow: NumberRange[], idx: number, firstIteration = false) => {
    const shuffleIdx = firstIteration ? idx : findDuplicateIdx(primaryRow, idx);

    if (shuffleIdx === -1) return;

    shuffleOnce(primaryRow, secondaryRow, shuffleIdx);
    shuffleRows(primaryRow, secondaryRow, shuffleIdx);
  };

  const shuffleStep = (direction: ShuffleDirection, matrix: Matrix, step: number) => {
    if (!step) return matrix;

    const targetMatrix = direction === 'vertical' ? matrix : flipMatrix(matrix);

    const targetRowIdx = Math.floor(Math.random() * CELLS_ON_AXIS);
    const targetCellIdx = Math.floor(Math.random() * CELLS_ON_AXIS);

    const primaryRow = [...targetMatrix[targetRowIdx]];

    const secondaryRowIdx = getSecondaryRowIdx(targetRowIdx);
    const secondaryRow = [...targetMatrix[secondaryRowIdx]];

    shuffleRows(primaryRow, secondaryRow, targetCellIdx, true);

    const shuffledMatrix = targetMatrix.map((row, rowIdx) => {
      if (rowIdx === targetRowIdx) return primaryRow;
      if (rowIdx === secondaryRowIdx) return secondaryRow;
      return row;
    });

    const resultMatrix = direction === 'vertical' ? shuffledMatrix : flipMatrix(shuffledMatrix);

    return shuffleStep(direction, resultMatrix, step - 1);
  };

  const isVerticalFirst = Boolean(Math.floor(Math.random() * 2));

  const firstDirection = isVerticalFirst ? 'vertical' : 'horizontal';
  const secondDirection = isVerticalFirst ? 'horizontal' : 'vertical';

  const shuffledInFirstDirectionMatrix = shuffleStep(firstDirection, matrix, steps);
  const shuffledInSecondDirectionMatrix = shuffleStep(secondDirection, shuffledInFirstDirectionMatrix, steps);

  return shuffledInSecondDirectionMatrix;
};
