import { useMemo } from 'react';
import { GameContext } from './context';
import { useBoard, useSelectedCell, useStatus } from './hooks';
import type { PropsWithChildren } from 'react';

export const GameContextProvider = ({ children }: PropsWithChildren) => {
  const { changeSelectedCell, selectedCell } = useSelectedCell();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { changeStatus, status } = useStatus();
  const { board } = useBoard();

  const value = useMemo(
    () => ({
      board,
      changeSelectedCell,
      selectedCell,
      status,
    }),
    [board, changeSelectedCell, selectedCell, status],
  );

  return <GameContext value={value}>{children}</GameContext>;
};
