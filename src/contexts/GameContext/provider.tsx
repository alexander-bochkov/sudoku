import { useCallback, useEffect, useMemo } from 'react';
import { GameContext } from './context';
import { useBoard, useSelectedCell, useStatus } from './hooks';
import type { PropsWithChildren } from 'react';
import type { NumberRange } from 'types/board';
import type { Nullable } from 'types/utility-types';

export const GameContextProvider = ({ children }: PropsWithChildren) => {
  const { changeSelectedCell, selectedCell } = useSelectedCell();
  const { changeStatus, status } = useStatus();
  const { board, createBoard, updateCell } = useBoard();

  useEffect(() => {
    changeStatus('loading');
    createBoard();
    changeStatus('playing');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNumpadClick = useCallback(
    (value: Nullable<NumberRange>) => {
      if (!selectedCell) return;

      updateCell(selectedCell, value ? { type: 'solution', value } : value);

      changeSelectedCell(null);
    },
    [changeSelectedCell, selectedCell, updateCell],
  );

  const value = useMemo(
    () => ({
      board,
      changeSelectedCell,
      selectedCell,
      status,
      onNumpadClick: handleNumpadClick,
    }),
    [board, changeSelectedCell, handleNumpadClick, selectedCell, status],
  );

  return <GameContext value={value}>{children}</GameContext>;
};
