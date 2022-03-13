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
  variants: {
    scrollbar: ['dark', 'rounded'],
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}