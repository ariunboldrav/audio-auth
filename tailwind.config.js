/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
console.log(colors)
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    colors: {
        primary: "#7A5CFA",
    },
    fontFamily: {
      "fm-noto": ['"Noto Sans Japanese"', "sans serif"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1rem",
      xl: "1rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
  },
  plugins: [require("flowbite/plugin")],
};
