import type { Config } from 'stylelint';

const config: Config = {
  extends: ['stylelint-config-standard-scss', 'stylelint-prettier/recommended'],
  ignoreFiles: ['dist/**', 'node_modules/**'],
  plugins: ['stylelint-order'],
  rules: {
    'color-hex-length': 'long',
    'order/properties-alphabetical-order': true,
    'selector-class-pattern': '^[a-z]+(?:[A-Z][a-z]+)*$',
  },
};

export default config;
