import { createContext } from 'react';
import { CellCoords } from 'types/board';
import type { Nullable } from 'types/utility-types';
import type { Status } from './types';

interface GameContext {
  changeSelectedCell: (nextSelectedCell: CellCoords) => void;
  selectedCell: Nullable<CellCoords>;
  status: Status;
}

export const GameContext = createContext<Nullable<GameContext>>(null);
