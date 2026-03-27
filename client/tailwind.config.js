/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: '#166534',
        growth: '#4ade80',
        beige: '#f5f5f4',
        dark: '#111827',
      },
    },
  },
  plugins: [],
}
