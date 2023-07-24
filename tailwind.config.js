/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        large: "48rem",
      },
      screens: {
        smaller: '340px'
      },
    },
  },
  plugins: [],
};
