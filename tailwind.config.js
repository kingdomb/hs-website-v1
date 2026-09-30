/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#050a1c', 900: '#0a1233', 800: '#101c4d', 700: '#182a6e' },
        royal: { 400: '#5b7bff', 500: '#2f54eb', 600: '#2443c4' },
        gold: { 300: '#f0d17a', 400: '#e4b84d', 500: '#d29d22' },
        ivory: { 50: '#fbf9f3', 100: '#f4efe3' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: { header: 'var(--header-h)' },
      boxShadow: { glow: '0 0 60px -10px rgba(228, 184, 77, 0.35)' },
    },
  },
  plugins: [],
};
