/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        'surface-hover': 'var(--surface-hover)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        primary: 'var(--primary)',
        'primary-soft': 'var(--primary-soft)',
        secondary: 'var(--secondary)',
        violet: 'var(--violet)',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.875rem',
        lg: '1.25rem',
        xl: '1.75rem',
      },
      maxWidth: {
        page: '76rem',
      },
      boxShadow: {
        card: '0 1px 0 0 var(--border) inset',
        lift: '0 24px 60px -28px var(--shadow)',
      },
    },
  },
  plugins: [],
}
