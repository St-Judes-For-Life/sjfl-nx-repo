/// <reference types="vitest" />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

import { lingui } from '@lingui/vite-plugin';

export default defineConfig({
  root: __dirname,
  build: {
    outDir: '../../dist/apps/sjfl-judians',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  cacheDir: '../../node_modules/.vite/sjfl-judians',

  server: {
    port: 4200,
    host: '0.0.0.0',
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

  plugins: [
    lingui(),
    react({
      babel: {
        plugins: ['macros'],
      },
    }),
    nxViteTsPaths(),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },
});
