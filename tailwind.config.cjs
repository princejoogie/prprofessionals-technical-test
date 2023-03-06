/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#3764B4",
          200: "#5B5E67",
          300: "#4D5057",
          400: "#3B3D43",
          500: "#292A2D",
          black: "#000000",
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
