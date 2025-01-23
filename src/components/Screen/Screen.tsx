import { useMemo } from 'react';
import { useScreenContext } from 'contexts';
import type { FC, ReactElement } from 'react';
import type { ScreenId } from 'types/screen';

interface ScreenProps {
  content: ReactElement;
  id: ScreenId;
}

export const Screen: FC<ScreenProps> = ({ content, id }) => {
  const { currentScreenId } = useScreenContext();
  return useMemo(() => currentScreenId === id && content, [content, currentScreenId, id]);
};
