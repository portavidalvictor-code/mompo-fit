/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Mompó Fit
        ink: {
          950: '#070707',
          900: '#0E0E0E',
          800: '#161616',
          700: '#1F1F1F',
        },
        bone: {
          DEFAULT: '#F5F2EE',
          50: '#FAF8F5',
          100: '#F5F2EE',
          200: '#E5E1DA',
          300: '#B8B3AA',
        },
        blood: {
          DEFAULT: '#0B5D3B',
          50: '#E5F4ED',
          400: '#1F8754',
          500: '#0B5D3B',
          600: '#084A2E',
          700: '#063920',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: {
        crush: '-0.04em',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'reveal': 'reveal 1s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
