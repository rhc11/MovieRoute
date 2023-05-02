/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@ant-design/react-native/lib/index.{js, jsx, ts, tsx}",
    "./node_modules/@ant-design/react-native/lib/button/index.{js, jsx, ts, tsx}",

    "./node_modules/@ant-design/react-native/lib/**/*.{js, jsx, ts, tsx}",
    "./node_modules/@ant-design/react-native/lib/**/**/*.{js, jsx, ts, tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFCD6B',
      },
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

