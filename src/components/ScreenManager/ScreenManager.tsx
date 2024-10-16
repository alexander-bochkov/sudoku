import { useCallback, useState } from 'react';
import { BoardContextProvider } from 'contexts';
import { GameScreen, TitleScreen } from 'screens';
import type { Screen } from 'types/screen';

export const ScreenManager = () => {
  const [screen, setScreen] = useState<Screen>('title');

  const handleScreenChange = useCallback((nextScreen: Screen) => {
    setScreen(nextScreen);
  }, []);

  switch (screen) {
    case 'title':
      return <TitleScreen onScreenChange={handleScreenChange} />;

    case 'game':
      return (
        <BoardContextProvider>
          <GameScreen onScreenChange={handleScreenChange} />
        </BoardContextProvider>
      );

    default:
      console.warn(`'${screen}' screen is not implemented`);
  }
};
