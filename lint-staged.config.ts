import type { Configuration } from 'lint-staged';

const config: Configuration = {
  '*': 'prettier --check',
  '*.{js,jsx,ts,tsx}': 'eslint --flag unstable_native_nodejs_ts_config',
  '*.{css,scss}': 'stylelint',
  '*.{ts,tsx}': () => 'tsc',
};

export default config;
