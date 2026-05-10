/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          hover: 'var(--color-primary-hover)',
        },
        income: 'var(--color-income)',
        expense: 'var(--color-expense)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
        budget: {
          safe: 'var(--color-budget-safe)',
          warn: 'var(--color-budget-warn)',
          danger: 'var(--color-budget-danger)',
        },
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          600: 'var(--color-gray-600)',
          900: 'var(--color-gray-900)',
        }
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'sans-serif'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      }
    },
  },
  plugins: [],
}
