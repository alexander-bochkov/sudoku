import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      common: typeof import('public/translations/en/common.json');
    };
  }
}
