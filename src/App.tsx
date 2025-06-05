import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { ROUTES } from 'constants/routes';
import { ParamsContextProvider } from 'contexts';
import { Game, MainMenu } from 'screens';
import { Loader } from 'ui';

export const App = () => (
  <Suspense fallback={<Loader />}>
    <ParamsContextProvider>
      <Routes>
        <Route path={ROUTES.MAIN_MENU} element={<MainMenu />} />
        <Route path={ROUTES.GAME} element={<Game />} />
      </Routes>
    </ParamsContextProvider>
  </Suspense>
);
