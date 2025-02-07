import { Suspense } from 'react';

import { Screen } from 'components';
import { ParamsContextProvider } from 'contexts';
import { Game, MainMenu } from 'screens';
import { Loader, Screen as ScreenUI } from 'ui';

export const App = () => (
  <Suspense fallback={<Loader />}>
    <ParamsContextProvider>
      <ScreenUI>
        <Screen id="main_menu">
          <MainMenu />
        </Screen>
        <Screen id="game">
          <Game />
        </Screen>
      </ScreenUI>
    </ParamsContextProvider>
  </Suspense>
);
