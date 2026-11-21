import type { Config } from 'tailwindcss'

/**
 * iverista design tokens.
 * Colours, fonts and shadows are used consistently across every section.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        espresso: '#2B1B14',
        roast: '#4A2C20',
        caramel: '#C68B59',
        cream: '#F6EBDD',
        foam: '#FFF8F0',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 45px -25px rgba(43, 27, 20, 0.35)',
        lift: '0 22px 45px -20px rgba(43, 27, 20, 0.45)',
        frame: '0 26px 55px -24px rgba(43, 27, 20, 0.55), 0 2px 0 rgba(255, 255, 255, 0.14) inset',
        plate: '0 10px 22px -14px rgba(43, 27, 20, 0.5)',
        inset: 'inset 0 1px 3px rgba(43, 27, 20, 0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      letterSpacing: {
        widest: '0.28em',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'ken-burns-a': {
          '0%': { transform: 'scale(1.03) translate3d(0, 0, 0)' },
          '100%': { transform: 'scale(1.16) translate3d(-1.8%, -2.2%, 0)' },
        },
        'ken-burns-b': {
          '0%': { transform: 'scale(1.16) translate3d(1.4%, 1.8%, 0)' },
          '100%': { transform: 'scale(1.02) translate3d(0, 0, 0)' },
        },
        'fade-rise': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.8s linear infinite',
        'ken-burns-a': 'ken-burns-a 9s ease-out forwards',
        'ken-burns-b': 'ken-burns-b 9s ease-out forwards',
        'fade-rise': 'fade-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
} satisfies Config
