import { useCallback, useEffect, useMemo, useState } from 'react';
import { GameContext } from './context';
import { useBoard, useSelectedCell } from './hooks';
import type { PropsWithChildren } from 'react';
import type { NumberRange } from 'types/board';
import type { Nullable } from 'types/utility-types';
import type { Status } from './types';

export const GameContextProvider = ({ children }: PropsWithChildren) => {
  const { board, createBoard, fullMatrix, updateCell } = useBoard();
  const { changeSelectedCell, selectedCell } = useSelectedCell();
  const [status, setStatus] = useState<Status>('playing');

  const shouldCheckBoard = useMemo(
    () => (board ? board.every((row) => row.every((cell) => cell && cell.type !== 'error')) : false),
    [board],
  );

  const checkBoard = useCallback(() => {
    if (!board || !fullMatrix) return;

    const isSolutionCorrect = board.every((row) =>
      row.every((cell) => cell && (cell.type === 'correct' || cell.type === 'prefilled')),
    );

    if (isSolutionCorrect) {
      setStatus('finished');
      return;
    }

    board.forEach((row, rowIdx) => {
      row.forEach((cell, cellIdx) => {
        if (!cell || cell.type === 'correct' || cell.type === 'prefilled') return;

        updateCell(
          { rowIdx, cellIdx },
          { ...cell, type: cell.value === fullMatrix[rowIdx][cellIdx] ? 'correct' : 'error' },
        );
      });
    });
  }, [board, fullMatrix, updateCell]);

  useEffect(() => {
    createBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shouldCheckBoard) checkBoard();
  }, [checkBoard, shouldCheckBoard]);

  const handleNumpadClick = useCallback(
    (value: Nullable<NumberRange>) => {
      if (!selectedCell) return;

      updateCell(selectedCell, value ? { type: 'solution', value } : value);

      changeSelectedCell(null);
    },
    [changeSelectedCell, selectedCell, updateCell],
  );

  const handlePause = useCallback((pause: boolean) => {
    setStatus(pause ? 'paused' : 'playing');
  }, []);

  const handleRestart = useCallback(() => {
    createBoard();
    setStatus('playing');
  }, [createBoard]);

  const value = useMemo(
    () => ({
      board,
      changeSelectedCell,
      selectedCell,
      status,
      onNumpadClick: handleNumpadClick,
      onPause: handlePause,
      onRestart: handleRestart,
    }),
    [board, changeSelectedCell, handleNumpadClick, handlePause, handleRestart, selectedCell, status],
  );

  return <GameContext value={value}>{children}</GameContext>;
};
