/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {},
    minWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
    },
    minHeight: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
    },
    extend: {
      height: {
        height: {
          128: '32rem',
        },
      },
      inset: {
        '3px': '3px',
      },
    },
  },
  plugins: [],
};
