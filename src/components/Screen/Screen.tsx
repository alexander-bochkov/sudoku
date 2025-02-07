import { useParamsContext } from 'contexts';

import type { PropsWithChildren } from 'react';
import type { ScreenID } from 'types/screen';

type ScreenProps = {
  id: ScreenID;
};

export const Screen = ({ children, id }: PropsWithChildren<ScreenProps>) => {
  const { screen } = useParamsContext();
  return screen === id && children;
};
