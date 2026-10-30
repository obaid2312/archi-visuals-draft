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
          red: '#ff1f3d',
          'red-dark': '#d90429',
          dark: '#080808',
          charcoal: '#121212',
          muted: '#8e8e93',
          card: '#161618'
        }
      },
      fontFamily: {
        sans: ['"Archivo"', 'sans-serif'],
        display: ['"Archivo"', 'sans-serif'],
        condensed: ['"Archivo"', 'sans-serif'],
        stats: ['"Plus Jakarta Sans"', '"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}

