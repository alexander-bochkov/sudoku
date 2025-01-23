import { createContext } from 'react';
import type { ScreenId } from 'types/screen';
import type { Nullable } from 'types/utility-types';

export interface ScreenContextType {
  currentScreenId: ScreenId;
  onScreenChange: (nextScreenId: ScreenId) => void;
}

export const ScreenContext = createContext<Nullable<ScreenContextType>>(null);
