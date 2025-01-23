import { useMemo, useState } from 'react';
import { ScreenContext } from './context';
import type { FC, PropsWithChildren } from 'react';
import type { ScreenId } from 'types/screen';
import type { ScreenContextType } from './context';

const DEFAULT_SCREEN_ID: ScreenId = 'main-menu';

export const ScreenContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentScreenId, setCurrentScreenId] = useState<ScreenId>(DEFAULT_SCREEN_ID);

  const value = useMemo(
    (): ScreenContextType => ({
      currentScreenId,
      onScreenChange: setCurrentScreenId,
    }),
    [currentScreenId],
  );

  return <ScreenContext value={value}>{children}</ScreenContext>;
};
