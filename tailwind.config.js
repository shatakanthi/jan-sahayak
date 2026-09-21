/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        civic: {
          navy: '#102A43',
          saffron: '#D97706',
          ivory: '#F8F7F2',
          stone: '#E7E5DF',
          charcoal: '#1F2933',
          slate: '#52606D',
          green: '#167D5A',
          red: '#B42318',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'civic-sm': '4px',
        'civic-md': '8px',
        'civic-lg': '12px',
      }
    },
  },
  plugins: [],
}
