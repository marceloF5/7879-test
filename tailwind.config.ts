const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: colors.black, //'#1D1D1B',
        white: colors.white,
        gray: colors.gray,
        cream: "#FAF7EF",
        gold: {
          DEFAULT: "#d9ba58",
          1: "#fdf8e7",
          9: "#f9efd2",
          18: "#ebd798",
          24: "#d9ba58",
          48: "#634d09",
          ore: "#312708",
        },
        platinum: {
          DEFAULT: "#b5b5b7",
          1: "#f4f4f5",
          9: "#eaeaeb",
          18: "#d5d5d8",
          24: "#b5b5b7",
          48: "#484850",
          ore: "#1D1D20",
        },
        saphire: {
          DEFAULT: "#326985",
          1: "#e9f2f7",
          9: "#c7dbe5",
          18: "#7da2b5",
          24: "#326985",
          48: "#143A4E",
          ore: "#091B25",
        },
      },
    },
  },
  plugins: [],
};
