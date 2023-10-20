const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'main-color': {
          DEFAULT: '#003E29',
          50: '#008558',
          100: '#007B51',
          200: '#006744',
          300: '#005236',
          400: '#003E29',
          500: '#003422',
          600: '#002A1C',
          700: '#001F15',
          800: '#00150E',
          900: '#000B07',
          950: '#000604'
        },
        "side-color": "#467061"
      }
    }
  },
  plugins: [],
}
//