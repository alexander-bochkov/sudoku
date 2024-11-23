import { createContext } from 'react';
import type { ScreenID } from 'types/screen';
import type { Nullable } from 'types/utility-types';

export interface ScreenContextType {
  activeScreen: ScreenID;
  onScreenChange: (nextScreen: ScreenID) => void;
}

export const ScreenContext = createContext<Nullable<ScreenContextType>>(null);
