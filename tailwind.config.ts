import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff8f0',
          100: '#ffefd9',
          200: '#ffdcb2',
          300: '#ffc07a',
          400: '#ff9d40',
          500: '#ff7d0a',   // primary saffron
          600: '#e86200',
          700: '#c04900',
          800: '#9a3a00',
          900: '#7c3100',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',   // bright gold
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        kumawat: {
          cream: '#fdf6ec',
          ochre: '#d4820a',
          maroon: '#7c1f1f',
          lotus: '#e8608a',
          deep: '#2d1a00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        devanagari: ['Noto Serif Devanagari', 'serif'],
      },
      backgroundImage: {
        // 'saffron-gradient': 'linear-gradient(135deg, #ff7d0a 0%, #fbbf24 50%, #ff9d40 100%)',
        // 'hero-gradient': 'linear-gradient(160deg, #c04900 0%, #ff7d0a 35%, #fbbf24 70%, #fcd34d 100%)',
        // 'card-gradient': 'linear-gradient(145deg, #fff8f0 0%, #ffefd9 100%)',
        // 'footer-gradient': 'linear-gradient(180deg, #2d1a00 0%, #1a0f00 100%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(251,191,36,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(251,191,36,0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'saffron': '0 4px 20px rgba(255,125,10,0.25)',
        'gold': '0 4px 20px rgba(251,191,36,0.30)',
        'warm': '0 8px 32px rgba(180,83,9,0.15)',
        'card': '0 2px 16px rgba(45,26,0,0.08)',
      },
    },
  },
  plugins: [],
}

export default config
