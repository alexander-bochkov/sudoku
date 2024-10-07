import { ScreenManager } from 'components';
import { PlayingFieldDimensionsProvider } from 'contexts';

export const App = () => (
  <PlayingFieldDimensionsProvider>
    <ScreenManager />
  </PlayingFieldDimensionsProvider>
);
