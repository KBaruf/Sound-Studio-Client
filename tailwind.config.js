/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      height: '100vh',
      width: '100vw',
    },
    minHeight: {
      '1/4': '25%',
    },
    extend: {},
  },
  plugins: [],
};
