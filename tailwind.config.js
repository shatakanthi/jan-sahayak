/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jan: {
          teal: '#16796F',      // Primary Deep Teal
          mutedTeal: '#599D9C', // Secondary Seafoam Teal
          sage: '#B7BDA9',      // Soft Sage Surface / Border
          green: '#148B4B',     // Vibrant Emerald Action
          bg: '#F4F6F3',
          card: '#FFFFFF',
          border: '#B7BDA9',
          textDark: '#16796F',
          textMuted: '#599D9C',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
