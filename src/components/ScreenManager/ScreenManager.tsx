import { useCallback, useState } from 'react';
import { TitleScreen } from 'screens';
import type { Screen } from 'types';

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
        <>
          <div>Game screen</div>
          <button onClick={() => handleScreenChange('title')}>Go to 'title' screen</button>
        </>
      );

    default:
      console.warn(`'${screen}' screen is not implemented`);
  }
};
