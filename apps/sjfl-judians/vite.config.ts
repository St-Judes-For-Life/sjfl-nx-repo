/// <reference types="vitest" />
import replaceFiles from '@nx/vite/plugins/rollup-replace-files.plugin';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

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
    host: 'localhost',
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
    replaceFiles([
      {
        replace: 'apps/sjfl-judians/src/environments/environment.ts',
        with: 'apps/sjfl-judians/src/environments/environment.prod.ts',
      },
    ]),
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
