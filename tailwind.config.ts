import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6FFF5',
          100: '#B3FFE4',
          200: '#80FFD3',
          300: '#4DFFC2',
          400: '#1AFFB1',
          500: '#00DC82',
          600: '#00B36B',
          700: '#008A53',
          800: '#00613B',
          900: '#003823',
        },
        dark: {
          900: '#020420',
          800: '#1a202c',
          700: '#2d3748',
          600: '#4a5568',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config 