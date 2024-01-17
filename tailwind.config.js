/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#DCFFB7',
          100: '#280274',
        },
        secondary: {
          50: '#DCFFB7',
          100: '#280274',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
