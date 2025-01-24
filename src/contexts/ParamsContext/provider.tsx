import { useMemo, useState } from 'react';
import { ParamsContext } from './context';
import { useDimensions, useLanguage } from './hooks';
import type { FC, PropsWithChildren } from 'react';
import type { Screen } from 'types/screen';
import type { ParamsContextType } from './context';

const DEFAULT_SCREEN: Screen = 'main-menu';

export const ParamsContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const dimensions = useDimensions();
  const { language, changeLanguage } = useLanguage();
  const [screen, setScreen] = useState<Screen>(DEFAULT_SCREEN);

  const value = useMemo(
    (): ParamsContextType => ({
      changeLanguage,
      changeScreen: setScreen,
      dimensions,
      language,
      screen,
    }),
    [changeLanguage, dimensions, language, screen],
  );

  return <ParamsContext value={value}>{children}</ParamsContext>;
};
