import { createContext } from 'react';
import type { Board_OLD, Cell_OLD } from 'types/board';
import type { Nullable } from 'types/utility-types';
import type { Status } from './types';

export interface BoardContextType {
  prefilledBoard: Nullable<Board_OLD>;
  solutionBoard: Nullable<Board_OLD>;
  selectedCell: Nullable<Cell_OLD>;
  setSelectedCell: (cell: Nullable<Cell_OLD>) => void;
  status: Status;
  errors: Nullable<Cell_OLD[]>;
  onNumberSelect: (selectedNumber: number) => void;
  onErase: () => void;
  onErrorsCheck: () => void;
  onRestart: () => void;
}

export const BoardContext = createContext<Nullable<BoardContextType>>(null);
