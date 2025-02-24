/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */

// text-xs - размер шрифта 0.75rem (12px)
// text-sm - размер шрифта 0.875rem (14px)
// text-base - размер шрифта 1rem (16px)
// text-lg - размер шрифта 1.125rem (18px)
// text-xl - размер шрифта 1.25rem (20px)
// text-2xl - размер шрифта 1.5rem (24px)
// text-3xl - размер шрифта 1.875rem (30px)
// text-4xl - размер шрифта 2.25rem (36px)
// text-5xl - размер шрифта 3rem (48px)
// text-6xl - размер шрифта 3.75rem (60px)
// text-7xl - размер шрифта 4.5rem (72px)
// text-8xl - размер шрифта 6rem (96px)
// text-9xl - размер шрифта 8rem (128px)

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': "360px", // ++
      'md': '800px',
      'lg': '1280px', // ++
      'xl': '1920px', // ++
    },
    extend: {
      keyframes: {
        'expand-width': {
          '0%': {
            width: '0',
            opacity: '0',
          },
          '100%': {
            width: '100%',
            opacity: '1',
          },
        }
      },
      animation: {
        'expand-width': 'expand-width 0.3s ease-out forwards'
      },
      screens: {

      },
      fontSize: {
        'xs': '13px',   // 12px
        'sm': '0.875rem',  // 14px
        'base': '1rem',    // 16px
        'lg': '1.125rem',  // 18px
        'xl': '1.25rem',   // 20px
        '2xl': '1.5rem',   // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem',  // 36px
        '5xl': '3rem',     // 48px
        '6xl': '3.75rem',  // 60px
        '7xl': '4.5rem',   // 72px
        '8xl': '6rem',     // 96px
        '9xl': '8rem',     // 128px
      },
      fontFamily: {
        'helvetica': ['Helvetica', 'sans-serif'],
        'patrizia': ['Patrizia', 'sans-serif'],
      },
      colors: {
        'bg-main': 'var(--bg-black-main)',
        'color-violet': 'var(--color-violet-main)',
        'violet-gradient': 'var(--violet-gradient)',
      },
      keyframes: {
        fadeIn: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
        
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards'
      }
    },
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ['autofill'],
    },
  },
  corePlugins: {
    // ... other core plugins
  },
  // Add this to your base styles
  variants: {
    extend: {},
  },
}
