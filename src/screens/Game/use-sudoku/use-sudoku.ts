import { useEffect, useMemo, useState } from 'react';

import { useWorker } from 'hooks/use-worker';
import { BoardGeneratorWorker } from 'workers/board-generator-worker';

import { verifyBoard } from './verify-board';

import type { Board, Cell, Coordinates, Difficulty, Matrix } from 'types/sudoku';
import type { Nullable } from 'types/utility-types';
import type { BoardGeneratorWorkerRequest, BoardGeneratorWorkerResponse } from 'workers/board-generator-worker';

type Status = 'IDLE' | 'GENERATING' | 'SOLVED';

const DEFAULT_STATUS: Status = 'IDLE';

export const useSudoku = () => {
  const [board, setBoard] = useState<Nullable<Board>>(null);
  const [matrix, setMatrix] = useState<Nullable<Matrix>>(null);
  const [status, setStatus] = useState<Status>(DEFAULT_STATUS);

  const { postMessage, response } = useWorker<BoardGeneratorWorkerRequest, BoardGeneratorWorkerResponse>(
    BoardGeneratorWorker,
  );

  const generateBoard = (difficulty: Difficulty) => {
    setBoard(null);
    setMatrix(null);
    setStatus('GENERATING');

    postMessage({ difficulty });
  };

  useEffect(() => {
    if (!response) return;

    setBoard(response.board);
    setMatrix(response.matrix);
    setStatus('IDLE');
  }, [response]);

  const shouldVerifyBoard = useMemo(
    () => !!(status !== 'SOLVED' && board?.every((row) => row.every(({ type, value }) => value && type !== 'error'))),
    [board, status],
  );

  useEffect(() => {
    if (!board || !matrix || !shouldVerifyBoard) return;

    const { isSolved, verifiedBoard } = verifyBoard(board, matrix);

    setBoard(verifiedBoard);
    isSolved && setStatus('SOLVED');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldVerifyBoard]);

  const setCell = (cell: Cell, coords: Coordinates) => {
    setBoard((prevBoard) => {
      if (!prevBoard) return prevBoard;

      return prevBoard.map((row, rowIdx) =>
        row.map((prevCell, colIdx) => (coords.rowIdx === rowIdx && coords.colIdx === colIdx ? cell : prevCell)),
      );
    });
  };

  return {
    board,
    generateBoard,
    setCell,
    status,
  };
};
