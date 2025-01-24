import { createContext } from 'react';
import type { Dimensions } from 'types/board';
import type { SupportedLanguage } from 'types/language';
import type { Screen } from 'types/screen';
import type { Nullable } from 'types/utility-types';

export interface ParamsContextType {
  changeLanguage: (language: SupportedLanguage) => void;
  changeScreen: (screen: Screen) => void;
  dimensions: Nullable<Dimensions>;
  language: SupportedLanguage;
  screen: Screen;
}

export const ParamsContext = createContext<Nullable<ParamsContextType>>(null);
