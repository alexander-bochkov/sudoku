import { createContext } from 'react';
import type { Board, Cell, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';
import type { Status } from './types';

export interface BoardContextType {
  dimensions: Nullable<Dimensions>;
  prefilledBoard: Nullable<Board>;
  solutionBoard: Nullable<Board>;
  selectedCell: Nullable<Cell>;
  setSelectedCell: (cell: Nullable<Cell>) => void;
  status: Status;
  errors: Nullable<Cell[]>;
  onNumberSelect: (selectedNumber: number) => void;
  onErase: () => void;
  onErrorsCheck: () => void;
  onRestart: () => void;
}

export const BoardContext = createContext<Nullable<BoardContextType>>(null);
