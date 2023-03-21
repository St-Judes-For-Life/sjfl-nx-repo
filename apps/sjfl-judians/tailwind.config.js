const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#005133',
        secondary: '#3D5F34',
        tertiary: '#7A6D34',
        accent: '#F48834',
        lightGray: '#f2f2f2',
        error: '#9A0000',
      },
    },
  },
  plugins: [],
};
