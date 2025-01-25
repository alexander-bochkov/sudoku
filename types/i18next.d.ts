import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      menu: typeof import('public/translations/en/menu.json');
      modals: typeof import('public/translations/en/modals.json');
    };
  }
}
