/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        brunson: ["Brunson", "sans-serif"],
        mont: ["Montserrat", "sans-serif"],
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#5a2a4d",
        dark: "#1f1f1f",
      },
      gridTemplateColumns: {
        15: "repeat(15, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
}
