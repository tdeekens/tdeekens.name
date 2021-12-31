/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [],
  theme: {
    fontFamily: {
      custom: ['Manrope', ...defaultTheme.fontFamily.mono],
    },
  },
};
