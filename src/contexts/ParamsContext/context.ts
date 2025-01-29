import { createContext } from 'react';

import type { SupportedLanguage } from 'types/language';
import type { Screen } from 'types/screen';
import type { Nullable } from 'types/utility-types';

interface ParamsContext {
  changeLanguage: (language: SupportedLanguage) => void;
  changeScreen: (screen: Screen) => void;
  language: SupportedLanguage;
  screen: Screen;
}

export const ParamsContext = createContext<Nullable<ParamsContext>>(null);
