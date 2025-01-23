import { useMemo, useState } from 'react';
import { ParamsContext } from './context';
import { useDimensions } from './hooks';
import type { FC, PropsWithChildren } from 'react';
import type { ScreenId } from 'types/screen';
import type { ParamsContextType } from './context';

const DEFAULT_SCREEN_ID: ScreenId = 'main-menu';

export const ParamsContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const dimensions = useDimensions();
  const [screenId, setScreenId] = useState<ScreenId>(DEFAULT_SCREEN_ID);

  const value = useMemo(
    (): ParamsContextType => ({
      dimensions,
      screenId,
      setScreenId,
    }),
    [dimensions, screenId],
  );

  return <ParamsContext value={value}>{children}</ParamsContext>;
};
