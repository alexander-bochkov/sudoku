import { ScreenManager } from 'components';
import { BoardContextProvider } from 'contexts';

export const App = () => (
  <BoardContextProvider>
    <ScreenManager />
  </BoardContextProvider>
);
