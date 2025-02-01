import { useMemo, useState } from 'react';

import { Loader } from 'ui';

import { ParamsContext } from './context';
import { useLanguage } from './hooks';

import type { PropsWithChildren } from 'react';
import type { Screen } from 'types/screen';

const DEFAULT_SCREEN: Screen = 'main-menu';

export const ParamsContextProvider = ({ children }: PropsWithChildren) => {
  const [showLoader, setShowLoader] = useState(false);
  const { changeLanguage, language } = useLanguage(setShowLoader);
  const [screen, setScreen] = useState<Screen>(DEFAULT_SCREEN);

  const value = useMemo(
    () => ({
      changeLanguage,
      changeScreen: setScreen,
      language,
      screen,
    }),
    [changeLanguage, language, screen],
  );

  return (
    <ParamsContext value={value}>
      {children}
      {showLoader && <Loader />}
    </ParamsContext>
  );
};
