import { createContext } from 'react';
import type { Board, Dimensions } from 'types/board';
import type { Nullable } from 'types/utility-types';

export type BoardContextType = {
  board: Nullable<{
    full: Nullable<Board>;
    prefilled: Nullable<Board>;
    solution: Nullable<Board>;
    errors: Nullable<Board>;
  }>;
  dimensions: Nullable<Dimensions>;
};

export const BoardContext = createContext<Nullable<BoardContextType>>(null);
