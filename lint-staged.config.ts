import type { Configuration } from 'lint-staged';

const config: Configuration = {
  '*': 'prettier --check',
  '*.{js,jsx,ts,tsx}': 'eslint',
  '*.{css,scss}': 'stylelint',
  '*.{ts,tsx}': () => 'tsc',
};

export default config;
