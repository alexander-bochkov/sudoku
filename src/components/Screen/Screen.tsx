import { useMemo } from 'react';
import { useParamsContext } from 'contexts';
import type { FC, ReactElement } from 'react';
import type { ScreenId } from 'types/screen';

interface ScreenProps {
  content: ReactElement;
  id: ScreenId;
}

export const Screen: FC<ScreenProps> = ({ content, id }) => {
  const { screenId } = useParamsContext();
  return useMemo(() => screenId === id && content, [content, screenId, id]);
};
