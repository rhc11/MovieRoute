/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'primary': '#FFCD6B',
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
