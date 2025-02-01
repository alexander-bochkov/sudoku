import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { Screen } from 'components';
import { GameContextProvider, ParamsContextProvider } from 'contexts';
import { Game, MainMenu } from 'screens';
import { Loader } from 'ui';

import './i18n';

import './global.scss';

const rootEl = document.getElementById('root');

if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <ParamsContextProvider>
        <Suspense fallback={<Loader />}>
          <Screen content={<MainMenu />} name="main-menu" />
          <Screen
            content={
              <GameContextProvider>
                <Game />
              </GameContextProvider>
            }
            name="game"
          />
        </Suspense>
      </ParamsContextProvider>
    </StrictMode>,
  );
}
