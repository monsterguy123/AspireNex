/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      height:{
        '110':'32rem'
      },
      colors: {
        'custom-purple': '#5d2057',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
   
}