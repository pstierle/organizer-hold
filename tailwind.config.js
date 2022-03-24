const colors = require('tailwindcss/colors')
module.exports = {
  purge: {
    enabled: true,
    preserveHtmlElements: false,
    content: ['./src/**/*.vue'],
    options: {
      safelist: ["dark"],
    },
  },
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        zinc: {
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
      }
    },
  },
  variants: {
    scrollbar: ['dark', 'rounded'],
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}