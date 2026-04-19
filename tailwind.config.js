/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        bg: '#0a0a0a',
        surface: '#141414',
        accent: '#c9a84c',
        'accent-light': '#e2c06b',
        muted: '#6b6b6b',
        border: 'rgba(255,255,255,0.07)',
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'float': 'float 5s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'grain': 'grain 0.4s steps(1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseDot: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(74,222,128,0.5)' },
          '50%': { boxShadow: '0 0 0 8px rgba(74,222,128,0)' },
        },
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-2%,-3%)' },
          '30%': { transform: 'translate(3%,2%)' },
          '50%': { transform: 'translate(-1%,4%)' },
          '70%': { transform: 'translate(2%,-2%)' },
          '90%': { transform: 'translate(-3%,1%)' },
        },
      },
    },
  },
  plugins: [],
}
