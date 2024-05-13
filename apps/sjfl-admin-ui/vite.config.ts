/// <reference types='vitest' />
import path from 'path';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/sjfl-admin-ui',

  server: {
    port: 4200,
    host: 'localhost',
    proxy: {
      '/admin': {
        target: 'https://8139-20-219-147-128.ngrok-free.app',
        secure: false,
        changeOrigin: true,
      },
    },
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        // your custom rules
        '../../node-modules',
      ],
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../dist/apps/sjfl-admin-ui',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/sjfl-admin-ui',
      provider: 'v8',
    },
  },
});
