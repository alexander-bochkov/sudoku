import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Screen } from 'components';
import { BoardContextProvider, ScreenContextProvider } from 'contexts';
import { Game, MainMenu } from 'screens';
import './global.scss';

const rootEl = document.getElementById('root');

if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <ScreenContextProvider>
        <Screen id="main-menu" component={<MainMenu />} />
        <Screen
          id="game"
          component={
            <BoardContextProvider>
              <Game />
            </BoardContextProvider>
          }
        />
      </ScreenContextProvider>
    </StrictMode>,
  );
}
