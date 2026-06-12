/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            50:  '#E6F1FB',
            100: '#B5D4F4',
            500: '#378ADD',
            600: '#185FA5',
            700: '#0C447C',
            900: '#042C53',
          },
          green: {
            50:  '#E1F5EE',
            500: '#1D9E75',
            600: '#0F6E56',
            800: '#085041',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
