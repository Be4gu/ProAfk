const colors = require("tailwindcss/colors");
module.exports = {
  content: ["index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      yellow: colors.amber,
      blue: colors.blue,
      dprimary: "#292929",
      mpurple: "#985EFF",
      lpurple: "#BB86FC",
      lcyan: "#03DAC5",
    },
  },
  plugins: [],
};
