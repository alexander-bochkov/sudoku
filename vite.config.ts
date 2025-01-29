import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_BASE_URL: BASE_URL } = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    base: BASE_URL,
    plugins: [react(), svgr(), tsconfigPaths()],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    resolve: {
      alias: {
        styles: '/src/styles',
      },
    },
  };
});
