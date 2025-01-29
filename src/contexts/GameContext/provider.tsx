import { useCallback, useEffect, useMemo, useState } from 'react';
import { GameContext } from './context';
import { useBoard, useSelectedCell } from './hooks';
import type { PropsWithChildren } from 'react';
import type { Cell, NumberRange } from 'types/board';
import type { Nullable } from 'types/utility-types';
import type { Status } from './types';

export const GameContextProvider = ({ children }: PropsWithChildren) => {
  const { board, changeBoard, changeCell, createBoard, fullMatrix } = useBoard();
  const { changeSelectedCell, selectedCell } = useSelectedCell();
  const [status, setStatus] = useState<Status>('playing');

  const shouldCheckSolution = useMemo(() => {
    if (!board || status === 'finished') return false;
    return board.every((row) => row.every((cell) => cell && cell.type !== 'error'));
  }, [board, status]);

  const checkSolution = useCallback(() => {
    if (!board || !fullMatrix) return;

    const nextBoard = board.map((row, rowIdx) =>
      row.map((cell, cellIdx) => {
        if (!cell || cell.type === 'correct' || cell.type === 'prefilled') return cell;
        return { ...cell, type: (cell.value === fullMatrix[rowIdx][cellIdx] ? 'correct' : 'error') as Cell['type'] };
      }),
    );

    changeBoard(nextBoard);

    const isSolved = nextBoard.every((row) =>
      row.every((cell) => cell && (cell.type === 'correct' || cell.type === 'prefilled')),
    );

    if (isSolved) {
      setStatus('finished');
    }
  }, [board, changeBoard, fullMatrix]);

  useEffect(() => {
    createBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shouldCheckSolution) {
      checkSolution();
    }
  }, [checkSolution, shouldCheckSolution]);

  const handleNumpadClick = useCallback(
    (value: Nullable<NumberRange>) => {
      if (selectedCell) {
        changeCell(selectedCell, value ? { type: 'solution', value } : value);
        changeSelectedCell(null);
      }
    },
    [changeCell, changeSelectedCell, selectedCell],
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
