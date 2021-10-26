const colors = require('tailwindcss/colors')

module.exports = {
    purge: [
    './src/**/*.vue'
  ],
  darkMode: "class",
  theme: {
    extend: {
        colors:{
            "alert": colors.red[400],
            "textHighlight": "#539BF5",
            darkMode:{
             primary: "#22272E",
             secondary: "#1C2128",
             medium: "#2D333B",
             light: "#2D333B",
             button: "#373E47",
             accent: "#373E47",
             text: colors.gray[200],
             textDark: colors.gray[400],
            },
            lightMode:{
              primary: colors.blueGray[400],
              secondary: colors.blueGray[500],
              light: colors.blueGray[200],
              button: colors.amber[400],
              accent: colors.amber[400],
              text: colors.gray[800],
              textDark: colors.gray[700],
            }
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