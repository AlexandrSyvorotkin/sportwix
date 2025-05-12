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
      width: {
        '1/7': '14.285714%',
      },
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
        'grey-gradient': 'var(--grey-gradient)',
        'btn-hover': 'var(--btn-hover)',

        'grey': 'var(--grey-separator)',
        
        // Добавленные цвета из legacy
        'bg-color': 'var(--bg-color)',
        'active-el': 'var(--active-el-color)',
        'hover-el': 'var(--hove-el-color)',
        'main': 'var(--main-color)',
        'bg-rectangle': 'var(--bg-rectangle-color)',
        
        // Цвета для чемпионата
        'champions-league': 'var(--championship-champions-league-place-color)',
        'europa-league': 'var(--championship-europa-league-place-color)',
        'conference-league': 'var(--championship-conference-league-place-color)',
        'bottom-place': 'var(--championship-bottom-place)',
        
        // Цвета для результатов
        'first-place': 'var(--results-first-place)',
        'second-place': 'var(--results-second-place)',
        'third-place': 'var(--results-third-place)',
        
        // Цвета для прогресс-бара
        'progress-bar-dark': 'var(--championship-table-team-progress-bar-dark)',
        'progress-bar-light': 'var(--championship-table-team-progress-bar-light)',
        
        // Цвета подложки
        'substrate': 'var(--substrate-color)',
        'substrate-light': 'var(--substrate-color-light)',
        
        // Цвет текста
        'text-light': 'var(--text-color-light)',
        
        // Цвета баннера
        'banner-dark': 'var(--banner-color-dark)',
        'banner-light': 'var(--banner-color-light)',
        
        // Цвета границы
        'border-dark': 'var(--resizable-border-dark)',
        'border-light': 'var(--resizable-border-light)',
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
}
