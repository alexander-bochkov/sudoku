import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Screen } from 'components';
import { BoardContextProvider, ParamsContextProvider } from 'contexts';
import { Game, MainMenu } from 'screens';
import './global.scss';

const rootEl = document.getElementById('root');

if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <ParamsContextProvider>
        <Screen content={<MainMenu />} id="main-menu" />
        <Screen
          content={
            <BoardContextProvider>
              <Game />
            </BoardContextProvider>
          }
          id="game"
        />
      </ParamsContextProvider>
    </StrictMode>,
  );
}
