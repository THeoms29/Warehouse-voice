/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom animations untuk smooth transitions
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 4s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        slideDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)'
          },
        },
        breathe: {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1'
          },
          '50%': {
            transform: 'scale(1.05)',
            opacity: '0.8'
          },
        },
      },
      colors: {
        "primary": "#137fec",
        "background-light": "#f6f7f8",
        "background-dark": "#111a22",
        "surface-dark": "#233648",
        "text-secondary": "#92adc9",
        "surface-light": "#ffffff",
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4', // cyan-500
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        }
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "sans": ["Inter", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
}