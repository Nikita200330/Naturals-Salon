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
          50: '#f9f8fc',
          100: '#f1eef9',
          200: '#e1d8f3',
          300: '#d0bdf6',
          400: '#b18ff0',
          500: '#8e61d6',
          600: '#6b43a8',
          700: '#4a2b7c',
          800: '#2d1b4e',
          900: '#1a0b2e',
          950: '#0f051a',
        },
        dark: {
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
          glass: 'rgba(17, 24, 39, 0.7)'
        },
        light: {
          100: '#ffffff',
          200: '#f8f7fa',
          300: '#efebf5',
          400: '#e5e1ef',
        },
        gold: {
          300: '#fde08b',
          400: '#d4af37',
          500: '#b5952f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        '3d': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        '3d-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        '3d-soft': '0 2px 4px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'purple-glow': '0 0 15px rgba(142, 97, 214, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
      }
    },
  },
  plugins: [],
}
