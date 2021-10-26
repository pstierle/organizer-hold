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
            "textHighlight": colors.lightBlue[300],
            darkMode:{
             primary: colors.gray[800],
             secondary: colors.gray[900],
             medium: colors.gray[850],
             light: colors.gray[600],
             button: colors.amber[500],
             accent: colors.amber[500],
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