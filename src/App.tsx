import { ScreenManager } from 'components';
import { PlayingFieldProvider } from 'contexts';

export const App = () => (
  <PlayingFieldProvider>
    <ScreenManager />
  </PlayingFieldProvider>
);
