import { useState } from 'react';

import { Loader } from 'ui';

import { ParamsContext } from './context';
import { useLanguage } from './use-language';

import type { PropsWithChildren } from 'react';
import type { Difficulty } from 'types/board';

const DEFAULT_DIFFICULTY: Difficulty = 'medium';

export const ParamsContextProvider = ({ children }: PropsWithChildren) => {
  const [difficulty, setDifficulty] = useState<Difficulty>(DEFAULT_DIFFICULTY);
  const [loader, setLoader] = useState(false);

  const [language, setLanguage] = useLanguage(setLoader);

  return (
    <ParamsContext
      value={{
        difficulty,
        setDifficulty,
        language,
        setLanguage,
      }}
    >
      {children}
      {loader && <Loader />}
    </ParamsContext>
  );
};
