import { useCallback, useState } from 'react';

type Screen = 'title' | 'game';

export const ScreenManager = () => {
  const [screen, setScreen] = useState<Screen>('title');

  const handleScreenChange = useCallback((nextScreen: Screen) => {
    setScreen(nextScreen);
  }, []);

  switch (screen) {
    case 'title':
      return (
        <>
          <div>Title screen</div>
          <button onClick={() => handleScreenChange('game')}>Go to 'game' screen</button>
        </>
      );

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
