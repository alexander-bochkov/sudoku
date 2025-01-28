import { useCallback, useMemo, useState } from 'react';
import { REMOVE_NUMBERS_QUANTITY, SHUFFLE_STEPS } from './constants';
import { convertMatrixToBoard, generateBasicMatrix, removeNumbers, shuffle } from './utils';
import type { Board, Cell, CellCoords } from 'types/board';
import type { Nullable } from 'types/utility-types';
import type { FullMatrix } from '../../types';

export const useBoard = () => {
  const [board, setBoard] = useState<Nullable<Board>>(null);
  const [fullMatrix, setFullMatrix] = useState<Nullable<FullMatrix>>(null);

  const basicMatrix = useMemo(() => generateBasicMatrix(), []);

  const createBoard = useCallback(() => {
    const fullMatrix = shuffle(basicMatrix, SHUFFLE_STEPS);
    const preparedMatrix = removeNumbers(fullMatrix, REMOVE_NUMBERS_QUANTITY);
    const board = convertMatrixToBoard(preparedMatrix);

    setBoard(board);
    setFullMatrix(fullMatrix);
  }, [basicMatrix]);

  const updateCell = useCallback((cellCoords: CellCoords, value: Nullable<Cell>) => {
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

  return useMemo(() => ({ board, createBoard, fullMatrix, updateCell }), [board, createBoard, fullMatrix, updateCell]);
};
