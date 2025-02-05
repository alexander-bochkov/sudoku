// There isn't official type declaration for eslint-plugin-react-hooks (version: 5.1.0)
declare module 'eslint-plugin-react-hooks' {
  import type { ESLint, Linter } from 'eslint';

  const plugin: ESLint.Plugin & {
    configs: {
      recommended: Linter.Config;
    };
  };

  export = plugin;
}
