import { useMemo } from 'react';
import { useParamsContext } from 'contexts';
import type { FC, ReactNode } from 'react';
import type { Screen as ScreenName } from 'types/screen';

interface ScreenProps {
  content: ReactNode;
  name: ScreenName;
}

export const Screen: FC<ScreenProps> = ({ content, name }) => {
  const { screen } = useParamsContext();
  return useMemo(() => screen === name && content, [content, name, screen]);
};
