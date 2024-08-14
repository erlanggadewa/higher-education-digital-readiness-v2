/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';
const rotateX = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-y-180': {
      transform: 'rotateY(180deg)',
    },
  });
});
module.exports = {
  content: ['./App.tsx', './app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#02988A',
          light: '#2cccb8',
          'dark-light': 'rgba(67,97,238,.15)',
          old: '#174b44',
        },
        secondary: {
          DEFAULT: '#14B8A6',
          light: '#ebe4f7',
          'dark-light': 'rgb(128 93 202 / 15%)',
        },
        success: {
          DEFAULT: '#00ab55',
          light: '#ddf5f0',
          'dark-light': 'rgba(0,171,85,.15)',
        },
        danger: {
          DEFAULT: '#e7515a',
          light: '#fff5f5',
          'dark-light': 'rgba(231,81,90,.15)',
        },
        warning: {
          DEFAULT: '#f9a500',
          light: '#fff9ed',
          'dark-light': 'rgba(226,160,63,.15)',
        },
        info: {
          DEFAULT: '#2196f3',
          light: '#e7f7ff',
          'dark-light': 'rgba(33,150,243,.15)',
        },
        dark: {
          DEFAULT: '#333333',
          light: '#eaeaec',
          'dark-light': 'rgba(59,63,92,.15)',
        },
        black: {
          DEFAULT: '#111111',
          light: '#e3e4eb',
          'dark-light': 'rgba(14,23,38,.15)',
        },
        white: {
          DEFAULT: '#ffffff',
          light: '#e0e6ed',
          dark: '#ffffff',
        },

        // shadcn
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        nunito: ['var(--font-nunito)'],
      },
      spacing: {
        4.5: '18px',
      },
      boxShadow: {
        '3xl': '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)',
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-invert-headings': theme('colors.white.dark'),
            '--tw-prose-invert-links': theme('colors.white.dark'),
            h1: { fontSize: '40px', marginBottom: '0.5rem', marginTop: 0 },
            h2: { fontSize: '32px', marginBottom: '0.5rem', marginTop: 0 },
            h3: { fontSize: '28px', marginBottom: '0.5rem', marginTop: 0 },
            h4: { fontSize: '24px', marginBottom: '0.5rem', marginTop: 0 },
            h5: { fontSize: '20px', marginBottom: '0.5rem', marginTop: 0 },
            h6: { fontSize: '16px', marginBottom: '0.5rem', marginTop: 0 },
            p: { marginBottom: '0.5rem' },
            li: { margin: 0 },
            img: { margin: 0 },
          },
        },
      }),
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    rotateX,
  ],
};
