import { Suspense } from 'react';

import { Screen } from 'components';
import { ParamsContextProvider } from 'contexts';
import { MainMenu } from 'screens';
import { Loader, Screen as ScreenUI } from 'ui';

// import { GameContextProvider } from 'contexts';
// import { Game } from 'screens';

export const App = () => (
  <Suspense fallback={<Loader />}>
    <ParamsContextProvider>
      <ScreenUI>
        <Screen id="main_menu">
          <MainMenu />
        </Screen>
        <Screen id="game">GAME</Screen>
      </ScreenUI>
    </ParamsContextProvider>
  </Suspense>
);

{
  /* <ParamsContextProvider>
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
</ParamsContextProvider> */
}
