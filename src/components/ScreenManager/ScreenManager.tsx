import { useCallback, useState } from 'react';
import { GameScreen, TitleScreen } from 'screens';
import type { Screen } from 'types';

export const ScreenManager = () => {
  const [screen, setScreen] = useState<Screen>('game');

  const handleScreenChange = useCallback((nextScreen: Screen) => {
    setScreen(nextScreen);
  }, []);

  switch (screen) {
    case 'title':
      return <TitleScreen onScreenChange={handleScreenChange} />;

    case 'game':
      return <GameScreen onScreenChange={handleScreenChange} />;

    default:
      console.warn(`'${screen}' screen is not implemented`);
  }
};
