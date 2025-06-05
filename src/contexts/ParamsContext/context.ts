import { createContext } from 'react';

import type { Difficulty } from 'types/board';
import type { SupportedLanguage } from 'types/language';
import type { Nullable } from 'types/utility-types';

type ParamsContext = {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
};

export const ParamsContext = createContext<Nullable<ParamsContext>>(null);
