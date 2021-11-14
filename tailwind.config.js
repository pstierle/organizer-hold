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
        colors:{
            "alert": colors.red[400],
            "textHighlight": "#539BF5",
            "success": "#347D39",
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
              primary: colors.gray[300],
              secondary: colors.gray[400],
              light: colors.gray[400],
              button: colors.gray[400],
              accent: colors.gray[400],
              text: colors.gray[800],
              textDark: colors.gray[600],
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