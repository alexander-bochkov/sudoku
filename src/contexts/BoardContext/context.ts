import { createContext } from 'react';
import type { Board, BoardVariant, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';

export type BoardContextType = {
  board: Nullable<Record<BoardVariant, Nullable<Board>>>;
  dimensions: Nullable<Dimensions>;
};

export const BoardContext = createContext<Nullable<BoardContextType>>(null);
