import { useState } from 'react';

import { Loader } from 'ui';

import { ParamsContext } from './context';
import { useLanguage } from './use-language';

import type { PropsWithChildren } from 'react';
import type { ScreenID } from 'types/screen';

const DEFAULT_SCREEN: ScreenID = 'main_menu';

export const ParamsContextProvider = ({ children }: PropsWithChildren) => {
  const [loader, setLoader] = useState(false);
  const [screen, setScreen] = useState<ScreenID>(DEFAULT_SCREEN);
  const [language, setLanguage] = useLanguage(setLoader);

  return (
    <ParamsContext
      value={{
        language,
        setLanguage,
        screen,
        setScreen,
      }}
    >
      {children}
      {loader && <Loader />}
    </ParamsContext>
  );
};
