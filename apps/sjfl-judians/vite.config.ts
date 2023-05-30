/// <reference types="vitest" />
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';

import { lingui } from '@lingui/vite-plugin';

export default defineConfig({
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
    lingui(),
    react({
      babel: {
        plugins: ['macros'],
      },
    }),
    viteTsConfigPaths({
      root: '../../',
    }),
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
