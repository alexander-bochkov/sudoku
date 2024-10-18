import { useMemo, useState } from 'react';
import { ScreenContext } from './context';
import type { FC, PropsWithChildren } from 'react';
import type { ScreenID } from 'types/screen';
import type { ScreenContextType } from './context';

const DEFAULT_SCREEN: ScreenID = 'main-menu';

export const ScreenContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState<ScreenID>(DEFAULT_SCREEN);

  const value = useMemo(
    (): ScreenContextType => ({
      activeScreen,
      onScreenChange: setActiveScreen,
    }),
    [activeScreen],
  );

  return <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>;
};
