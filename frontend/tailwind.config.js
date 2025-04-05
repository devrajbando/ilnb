/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'], // Adjust the paths as necessary
    theme: {
      extend: {},
    },
    plugins: [require('daisyui')],
  };