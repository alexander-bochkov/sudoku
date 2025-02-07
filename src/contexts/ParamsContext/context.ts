import { createContext } from 'react';

import type { SupportedLanguage } from 'types/language';
import type { ScreenID } from 'types/screen';
import type { Nullable } from 'types/utility-types';

type ParamsContext = {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  screen: ScreenID;
  setScreen: (screen: ScreenID) => void;
};

export const ParamsContext = createContext<Nullable<ParamsContext>>(null);
