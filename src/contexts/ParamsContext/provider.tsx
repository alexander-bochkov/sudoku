import { useState } from 'react';

import { ParamsContext } from './context';

import type { PropsWithChildren } from 'react';
import type { Difficulty } from 'types/sudoku';

const DEFAULT_DIFFICULTY: Difficulty = 'medium';

export const ParamsContextProvider = ({ children }: PropsWithChildren) => {
  const [difficulty, setDifficulty] = useState<Difficulty>(DEFAULT_DIFFICULTY);

  return (
    <ParamsContext
      value={{
        difficulty,
        setDifficulty,
      }}
    >
      {children}
    </ParamsContext>
  );
};
