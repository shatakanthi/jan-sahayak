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
          gold: '#e8ab16',     // Action Buttons, Primary CTAs & Active Highlights
          navy: '#324a60',     // Headers, Navbars & Main Titles
          taupe: '#896e6a',    // Borders, Muted Labels & Dividers
          olive: '#74744a',    // Verified Badges & Success Tags
          dark: '#383b3d',     // Primary Readable Body Text
          bg: '#F8F9FA',
          card: '#FFFFFF',
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
