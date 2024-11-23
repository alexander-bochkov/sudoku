import { useMemo } from 'react';
import { useScreenContext } from 'contexts';
import type { FC, ReactElement } from 'react';
import type { ScreenID } from 'types/screen';

interface ScreenProps {
  component: ReactElement;
  id: ScreenID;
}

export const Screen: FC<ScreenProps> = ({ component, id }) => {
  const { activeScreen } = useScreenContext();
  return useMemo(() => activeScreen === id && component, [activeScreen, component, id]);
};
