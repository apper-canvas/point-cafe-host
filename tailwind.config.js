/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6F4E37',
        secondary: '#D4A574',
        accent: '#E97451',
        surface: {
          50: '#FFF8F3',
          100: '#FEF2E8',
          200: '#FDE4D0',
          300: '#FBD5B8',
          400: '#FAC6A0',
          500: '#F8B788',
          600: '#F6A870',
          700: '#F49958',
          800: '#F28A40',
          900: '#F07B28'
        },
        background: '#FEFDFB',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Playfair Display', 'serif']
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(135deg, rgba(111, 78, 55, 0.8) 0%, rgba(212, 165, 116, 0.6) 100%)",
      }
    }
  },
  plugins: [],
}