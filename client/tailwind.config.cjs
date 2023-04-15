const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // primary: {
        //   100: '#fff7cc',
        //   200: '#ffef99',
        //   300: '#ffe766',
        //   400: '#ffdf33',
        //   500: '#ffd700',
        //   600: '#ccac00',
        //   700: '#998100',
        //   800: '#665600',
        //   900: '#332b00',
        // },
        // primary: {
        //   100: '#fde9e9',
        //   200: '#fbd2d4',
        //   300: '#f9bcbe',
        //   400: '#f7a5a9',
        //   500: '#f58f93',
        //   600: '#c47276',
        //   700: '#935658',
        //   800: '#62393b',
        //   900: '#311d1d',
        // },
        // primary: {
        //   100: '#ffcce5',
        //   200: '#ff99cc',
        //   300: '#ff66b2',
        //   400: '#ff3399',
        //   500: '#ff007f',
        //   600: '#cc0066',
        //   700: '#99004c',
        //   800: '#660033',
        //   900: '#330019',
        // },
        primary: {
          100: '#e6cccc',
          200: '#cc9999',
          300: '#b36666',
          400: '#993333',
          500: '#800000',
          600: '#660000',
          700: '#4d0000',
          800: '#330000',
          900: '#1a0000',
        },
      },
      fontFamily: {
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxs: '0.5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
