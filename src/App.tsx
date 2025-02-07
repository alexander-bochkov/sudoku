import { Screen } from 'components';
import { ParamsContextProvider } from 'contexts';
import { Screen as ScreenUI } from 'ui';

// import { Suspense } from 'react';
// import { GameContextProvider } from 'contexts';
// import { Game, MainMenu } from 'screens';
// import { Loader } from 'ui';

export const App = () => (
  <ParamsContextProvider>
    {/* <Suspense fallback={<Loader />}> */}
    <ScreenUI>
      <Screen id="main_menu">MAIN_MENU</Screen>
      <Screen id="game">GAME</Screen>
    </ScreenUI>
  </ParamsContextProvider>
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
