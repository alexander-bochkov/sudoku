import { Route, Routes } from 'react-router';

import { ROUTES } from 'constants/routes';
import { ParamsContextProvider } from 'contexts';
import { useUpdateHtmlLang } from 'localization';
import { Game, MainMenu } from 'screens';

export const App = () => {
  useUpdateHtmlLang();

  return (
    <ParamsContextProvider>
      <Routes>
        <Route path={ROUTES.MAIN_MENU} element={<MainMenu />} />
        <Route path={ROUTES.GAME} element={<Game />} />
      </Routes>
    </ParamsContextProvider>
  );
};
