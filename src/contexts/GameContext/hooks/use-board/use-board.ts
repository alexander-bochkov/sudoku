import { useCallback, useMemo, useState } from 'react';

import { MATRIX_TEMPLATE, REMOVE_NUMBERS_QUANTITY, SHUFFLE_STEPS } from './constants';
import { convertMatrixToBoard, removeNumbers, shuffle } from './utils';

import type { Matrix } from '../../types';
import type { Board, Cell, CellCoords } from 'types/board';
import type { Nullable } from 'types/utility-types';

export const useBoard = () => {
  const [board, setBoard] = useState<Nullable<Board>>(null);
  const [fullMatrix, setFullMatrix] = useState<Nullable<Matrix>>(null);

  const createBoard = useCallback(() => {
    const fullMatrix = shuffle(MATRIX_TEMPLATE, SHUFFLE_STEPS);
    const preparedMatrix = removeNumbers(fullMatrix, REMOVE_NUMBERS_QUANTITY);
    const board = convertMatrixToBoard(preparedMatrix);

    setBoard(board);
    setFullMatrix(fullMatrix);
  }, []);

  const changeCell = useCallback((cellCoords: CellCoords, value: Nullable<Cell>) => {
    setBoard((prevBoard) => {
      if (!prevBoard) return prevBoard;

      return prevBoard.map((row, rowIdx) =>
        row.map((cell, cellIdx) => {
          const shouldUpdateCell = rowIdx === cellCoords.rowIdx && cellIdx === cellCoords.cellIdx;
          return shouldUpdateCell ? value : cell;
        }),
      );
    });
  }, []);

  return useMemo(
    () => ({ board, changeBoard: setBoard, changeCell, createBoard, fullMatrix }),
    [board, createBoard, fullMatrix, changeCell],
  );
};
