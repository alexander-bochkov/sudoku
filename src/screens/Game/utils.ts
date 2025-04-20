import { CELLS_IN_ZONE, CELLS_ON_AXIS } from './constants';

import type { Matrix, PrefilledMatrix, ShuffleDirection } from './types';
import type { Board, NumberRange } from 'types/board';

export const cloneMatrix = (matrix: Matrix | PrefilledMatrix) => matrix.map((row) => row.map((cell) => cell));

export const convertMatrixToBoard = (matrix: PrefilledMatrix): Board =>
  matrix.map((row) => row.map((cell) => (cell ? { type: 'prefilled', value: cell } : cell)));

const hasNumberInRow = (matrix: PrefilledMatrix, rowIdx: number, value: number) => {
  return matrix[rowIdx].some((matrixValue) => matrixValue === value);
};

const hasNumberInColumn = (matrix: PrefilledMatrix, cellIdx: number, value: number) => {
  const columns = matrix.map((row, rowIdx) => row.map((_, cellIdx) => matrix[cellIdx][rowIdx]));
  return columns[cellIdx].some((matrixValue) => matrixValue === value);
};

const hasNumberInZone = (matrix: PrefilledMatrix, rowIdx: number, cellIdx: number, value: number) => {
  const zones = matrix.map((row, rowIdx) =>
    row.map((_, cellIdx) => {
      const zoneIdxX = Math.floor(cellIdx / CELLS_IN_ZONE);
      const zoneIdxY = Math.floor(rowIdx / CELLS_IN_ZONE);

      const cellIdxInZoneX = cellIdx % CELLS_IN_ZONE;
      const cellIdxInZoneY = rowIdx % CELLS_IN_ZONE;

      const targetRowIdx = zoneIdxX + zoneIdxY * CELLS_IN_ZONE;
      const targetCellIdx = cellIdxInZoneX + cellIdxInZoneY * CELLS_IN_ZONE;

      return matrix[targetRowIdx][targetCellIdx];
    }),
  );

  const zoneIdxX = Math.floor(cellIdx / CELLS_IN_ZONE);
  const zoneIdxY = Math.floor(rowIdx / CELLS_IN_ZONE);

  const targetRowIdx = zoneIdxX + zoneIdxY * CELLS_IN_ZONE;

  return zones[targetRowIdx].some((matrixValue) => matrixValue === value);
};

const hasUniqueSolution = (matrix: PrefilledMatrix) => {
  let solutions = 0;

  const solveMatrix = (matrix: PrefilledMatrix) => {
    for (let rowIdx = 0; rowIdx < CELLS_ON_AXIS; rowIdx++) {
      for (let cellIdx = 0; cellIdx < CELLS_ON_AXIS; cellIdx++) {
        if (!matrix[rowIdx][cellIdx]) {
          for (let value = 1; value <= CELLS_ON_AXIS; value++) {
            if (
              !hasNumberInRow(matrix, rowIdx, value) &&
              !hasNumberInColumn(matrix, cellIdx, value) &&
              !hasNumberInZone(matrix, rowIdx, cellIdx, value)
            ) {
              matrix[rowIdx][cellIdx] = value as NumberRange;

              if (solveMatrix(matrix)) return true;

              matrix[rowIdx][cellIdx] = null;
            }
          }

          return false;
        }
      }
    }

    solutions++;

    return solutions > 1;
  };

  solveMatrix(matrix);

  return solutions === 1;
};

export const removeNumbers = (matrix: Matrix, quantity: number): PrefilledMatrix => {
  const prefilledMatrix = cloneMatrix(matrix);

  for (let i = 0; i < quantity; i++) {
    const rowIdx = Math.floor(Math.random() * CELLS_ON_AXIS);
    const cellIdx = Math.floor(Math.random() * CELLS_ON_AXIS);

    if (!prefilledMatrix[rowIdx][cellIdx]) {
      i = i - 1;
      continue;
    }

    const value = prefilledMatrix[rowIdx][cellIdx];

    prefilledMatrix[rowIdx][cellIdx] = null;

    if (hasUniqueSolution(cloneMatrix(prefilledMatrix))) {
      continue;
    }

    prefilledMatrix[rowIdx][cellIdx] = value;
    i = i - 1;
  }

  return prefilledMatrix;
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
