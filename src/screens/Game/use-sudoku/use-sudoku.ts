import { useCallback, useEffect, useMemo, useState } from 'react';

import { useBoardGenerator } from './use-board-generator';
import { verifyBoard } from './verify-board';

import type { BoardGenerationHandler } from './use-board-generator';
import type { Board, Cell, Coordinates, Difficulty, Matrix } from 'types/sudoku';
import type { Nullable } from 'types/utility-types';

type Status = 'IDLE' | 'GENERATING' | 'SOLVED';

const DEFAULT_STATUS: Status = 'IDLE';

export const useSudoku = () => {
  // TODO: think about replacing useState<Board> with useReducer
  const [board, setBoard] = useState<Nullable<Board>>(null);
  const [matrix, setMatrix] = useState<Nullable<Matrix>>(null);
  const [status, setStatus] = useState<Status>(DEFAULT_STATUS);

  const handleBoardGeneration: BoardGenerationHandler = useCallback(({ data: { board, matrix } }) => {
    setBoard(board);
    setMatrix(matrix);
    setStatus('IDLE');
  }, []);

  const generate = useBoardGenerator(handleBoardGeneration);

  const generateBoard = (difficulty: Difficulty) => {
    setBoard(null);
    setMatrix(null);
    setStatus('GENERATING');

    generate(difficulty);
  };

  const setCell = (cell: Cell, coords: Coordinates) => {
    setBoard((prevBoard) =>
      !prevBoard
        ? prevBoard
        : prevBoard.map((row, rowIdx) =>
            row.map((prevCell, colIdx) => (coords.rowIdx === rowIdx && coords.colIdx === colIdx ? cell : prevCell)),
          ),
    );
  };

  const shouldVerifyBoard = useMemo(
    () => !!(status !== 'SOLVED' && board?.every((row) => row.every(({ type, value }) => value && type !== 'error'))),
    [board, status],
  );

  useEffect(() => {
    if (!shouldVerifyBoard || !board || !matrix) return;

    const { isSolved, verifiedBoard } = verifyBoard(board, matrix);

    setBoard(verifiedBoard);
    isSolved && setStatus('SOLVED');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldVerifyBoard]);

  return {
    board,
    generateBoard,
    setBoard,
    setCell,
    status,
  };
};
