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
          blue: '#0F4C81',
          darkblue: '#0B2545',
          orange: '#EA580C',
          saffron: '#F97316',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          textDark: '#0B2545',
          textMuted: '#64748B',
          green: '#059669',
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
