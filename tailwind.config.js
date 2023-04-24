/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./source/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#f0faf5',
          '100': '#c9f4ea',
          '200': '#a1e8d8',
          '300': '#75dcc7',
          '400': '#49d0b6',
          '500': '#09b285',
          '600': '#098d6f',
          '700': '#076856',
          '800': '#05413d',
          '900': '#032b23',
          dark: "#054f3b",
          medium: "#078563"
        },
        secondary: {
          '50': '#ffe5cc',
          '100': '#ffd1a6',
          '200': '#ffbd80',
          '300': '#ffa659',
          '400': '#ff9442',
          '500': '#FFC86B',
          '600': '#d98c4e',
          '700': '#b25531',
          '800': '#8e2d14',
          '900': '#6b0000',
        },
        white: "#FFFEFD",
        black: "#161616",
      }
    },
  },
  plugins: [],
}
