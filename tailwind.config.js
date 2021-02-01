module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "hero-pattern":
          "url('https://media.giphy.com/media/xVn3ZmKrKIOLS/giphy.gif')",
      }),
    },
    fontFamily: {
      sans: ["Helvetica", "Arial", "sans-serif"],
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#4FCBD5",
      "primary-dark": "#28A3AC",

      secondary: "#ffed4a",
      danger: "#e3342f",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      primary: "#4FCBD5",
      "primary-dark": "#28A3AC",

      secondary: "#ffed4a",
      danger: "#e3342f",
    }),
    borderColor: theme => ({
      ...theme('colors'),
       DEFAULT: theme('colors.gray.300', 'currentColor'),
      'primary': '#4FCBD5',
      'secondary': '#ffed4a',
      'danger': '#e3342f',
     })
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
