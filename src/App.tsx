import { ScreenManager } from 'components';
import { BoardContextProvider, PlayingFieldProvider } from 'contexts';

export const App = () => (
  <BoardContextProvider>
    <PlayingFieldProvider>
      <ScreenManager />
    </PlayingFieldProvider>
  </BoardContextProvider>
);
