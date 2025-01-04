/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '2xl': '1536px',
        '3xl': '1920px'
      }
    },
  },
  plugins: [],
}
