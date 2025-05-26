 /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
    theme: {
      extend: {
        colors:{
          background:"#191A1C",
          customGray:"#1F2022",
          customBlue : "#1780EA"
        }
      },
    },
    plugins: [],
  }