import { createContext } from 'react';
import type { Dimensions } from 'types/board';
import type { ScreenId } from 'types/screen';
import type { Nullable } from 'types/utility-types';

export interface ParamsContextType {
  dimensions: Nullable<Dimensions>;
  screenId: ScreenId;
  setScreenId: (screenId: ScreenId) => void;
}

export const ParamsContext = createContext<Nullable<ParamsContextType>>(null);
