import { createContext } from 'react';
import { Board, CellCoords } from 'types/board';
import type { Nullable } from 'types/utility-types';
import type { Status } from './types';

interface GameContext {
  board: Board;
  changeSelectedCell: (nextSelectedCell: CellCoords) => void;
  selectedCell: Nullable<CellCoords>;
  status: Status;
}

export const GameContext = createContext<Nullable<GameContext>>(null);
