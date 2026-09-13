import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Primary teal accent scale ──
        teal: {
          50:  '#e6faf9',
          100: '#b3f0ec',
          200: '#80e6df',
          300: '#4ddcd2',
          400: '#26d0c5',
          500: '#0ecbbc',   // primary accent
          600: '#0bb5a7',
          700: '#089e92',
          800: '#05877c',
          900: '#036158',
        },
        // ── Dark surface scale ──
        surface: {
          900: '#0b1a1a',   // page background
          800: '#0f2020',
          700: '#122525',   // card background
          600: '#163030',   // elevated card
          500: '#1a3535',   // hover card
          400: '#204040',   // borders
          300: '#2a5050',   // subtle borders
        },
        // ── Legacy kumawat tokens (remapped to dark teal) ──
        kumawat: {
          cream: '#0b1a1a',
          ochre: '#0ecbbc',
          maroon: '#0bb5a7',
          lotus:  '#4ddcd2',
          deep:   '#ffffff',
        },
        // ── Legacy saffron scale (remapped to teal) ──
        saffron: {
          50:  '#e6faf9',
          100: '#b3f0ec',
          200: 'rgba(14,203,188,0.2)',
          300: '#4ddcd2',
          400: '#26d0c5',
          500: '#0ecbbc',
          600: '#0bb5a7',
          700: '#089e92',
          800: '#05877c',
          900: '#036158',
        },
        // ── Legacy gold scale (remapped to teal-light) ──
        gold: {
          50:  '#e6faf9',
          100: '#b3f0ec',
          200: '#80e6df',
          300: '#4ddcd2',
          400: '#26d0c5',
          500: '#0ecbbc',
          600: '#0bb5a7',
          700: '#089e92',
          800: '#05877c',
          900: '#036158',
        },
      },
      fontFamily: {
        sans:       ['Inter', 'system-ui', 'sans-serif'],
        serif:      ['Playfair Display', 'Georgia', 'serif'],
        devanagari: ['Noto Serif Devanagari', 'serif'],
      },
      animation: {
        'fade-in-up':  'fadeInUp 0.6s ease-out forwards',
        'fade-in':     'fadeIn 0.5s ease-out forwards',
        'pulse-teal':  'pulseTeal 2s ease-in-out infinite',
        'float':       'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseTeal: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(14,203,188,0.4)' },
          '50%':       { boxShadow: '0 0 0 12px rgba(14,203,188,0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'teal':      '0 4px 24px rgba(14,203,188,0.25)',
        'card':      '0 2px 16px rgba(0,0,0,0.40)',
        'card-hover':'0 8px 32px rgba(0,0,0,0.55)',
        'glow':      '0 0 40px rgba(14,203,188,0.15)',
        // legacy aliases
        'saffron':   '0 4px 24px rgba(14,203,188,0.25)',
        'gold':      '0 4px 24px rgba(14,203,188,0.25)',
        'warm':      '0 8px 32px rgba(0,0,0,0.55)',
      },
    },
  },
  plugins: [],
}

export default config
