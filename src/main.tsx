import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router';

import { initLocalization } from 'localization';

import { App } from './App';

import './global.scss';

initLocalization();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootEl = document.getElementById('root')!;

createRoot(rootEl).render(
  <StrictMode>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </StrictMode>,
);
