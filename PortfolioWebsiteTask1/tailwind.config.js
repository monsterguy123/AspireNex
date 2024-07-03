/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: '#333333',
        blue: '#334982',
        grey: '#f3f3f3',
        orange: '#fdb913',
        pink: '#e40087',
        purple: '#782b8f',
        red: '#dd372f',
        teal: '#00857d',
        white: '#fff',
      },
      height:{
        '128':'36rem',
        '110':'32rem'
      },
      width:{
        '110':'36rem'
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        mono: ['Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}