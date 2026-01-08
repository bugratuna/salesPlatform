/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-pink': '#ffe4e6', // rose-100
        'brand-peach': '#ffedd5', // orange-100
        'brand-beige': '#f5f5f4', // stone-100
        'brand-text': '#4a4a4a',
      },
    },
  },
  plugins: [],
}
