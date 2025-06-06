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
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '360px',
      md: '768px',
      lg: '1366px',
      xl: '1920px',
    },
    extend: {
      width: {
        '1/7': '14.285714%',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
      },
      screens: {},
      fontSize: {
        xs: '13px',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      fontFamily: {
        helvetica: ['Helvetica', 'sans-serif'],
        patrizia: ['Patrizia', 'sans-serif'],
      },
      colors: {
        'bg-main': 'var(--bg-black-main)',
        'color-violet': 'var(--color-violet-main)',
        'violet-gradient': 'var(--violet-gradient)',
        'grey-gradient': 'var(--grey-gradient)',
        'btn-hover': 'var(--btn-hover)',
        grey: 'var(--grey-separator)',
        'bg-color': 'var(--bg-color)',
        'active-el': 'var(--active-el-color)',
        'hover-el': 'var(--hove-el-color)',
        main: 'var(--main-color)',
        'bg-rectangle': 'var(--bg-rectangle-color)',
        'champions-league': 'var(--championship-champions-league-place-color)',
        'europa-league': 'var(--championship-europa-league-place-color)',
        'conference-league': 'var(--championship-conference-league-place-color)',
        'bottom-place': 'var(--championship-bottom-place)',
        'first-place': 'var(--results-first-place)',
        'second-place': 'var(--results-second-place)',
        'third-place': 'var(--results-third-place)',
        'progress-bar-dark': 'var(--championship-table-team-progress-bar-dark)',
        'progress-bar-light': 'var(--championship-table-team-progress-bar-light)',
        substrate: 'var(--substrate-color)',
        'substrate-light': 'var(--substrate-color-light)',
        'text-light': 'var(--text-color-light)',
        'banner-dark': 'var(--banner-color-dark)',
        'banner-light': 'var(--banner-color-light)',
        'border-dark': 'var(--resizable-border-dark)',
        'border-light': 'var(--resizable-border-light)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  variants: {
    extend: {
      backgroundColor: ['autofill'],
    },
  },
  corePlugins: {
    // ... other core plugins
  },
}
