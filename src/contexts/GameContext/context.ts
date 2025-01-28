import { createContext } from 'react';
import { Board, CellCoords, NumberRange } from 'types/board';
import type { Nullable } from 'types/utility-types';
import type { Status } from './types';

interface GameContext {
  board: Nullable<Board>;
  changeSelectedCell: (selectedCell: CellCoords) => void;
  selectedCell: Nullable<CellCoords>;
  status: Status;
  onNumpadClick: (value: Nullable<NumberRange>) => void;
  onPause: (pause: boolean) => void;
  onRestart: () => void;
}

export const GameContext = createContext<Nullable<GameContext>>(null);
