import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Screen } from 'components';
import { BoardContextProvider, ScreenContextProvider } from 'contexts';
import { GameScreen, TitleScreen } from 'screens';
import './global.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScreenContextProvider>
      <Screen id="main-menu" content={<TitleScreen />} />
      <Screen
        id="game"
        content={
          <BoardContextProvider>
            <GameScreen />
          </BoardContextProvider>
        }
      />
    </ScreenContextProvider>
  </StrictMode>,
);
