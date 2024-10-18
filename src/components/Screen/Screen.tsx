import { useMemo } from 'react';
import { useScreenContext } from 'contexts';
import type { FC, ReactElement } from 'react';
import type { ScreenID } from 'types/screen';

type ScreenProps = {
  content: ReactElement;
  id: ScreenID;
};

export const Screen: FC<ScreenProps> = ({ content, id }) => {
  const { activeScreen } = useScreenContext();
  return useMemo(() => activeScreen === id && content, [activeScreen, content, id]);
};
