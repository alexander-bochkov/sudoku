import 'i18next';

import type { resources } from './resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)['en'];
  }
}
