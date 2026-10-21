/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#e8f3e5',
          DEFAULT: '#14532d',
          dark: '#0f3f22',
          accent: '#f2a93b',
          gray: '#e5e7eb',
          black: '#0a0a0a',
          bg: '#f8f9fa'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      }
    },
  },
  plugins: [],
}