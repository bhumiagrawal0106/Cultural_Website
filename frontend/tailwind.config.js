/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        india: {
          orange: '#FF9933',
          saffron: '#E87722',
          white: '#FFFFFF',
          green: '#138808',
          navy: '#06038D',
          crimson: '#DC143C',
          bg: '#F8F9FA',
          text: '#212121',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Noto Sans', 'Noto Sans Devanagari', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -6px rgba(6, 3, 141, 0.12)',
        glow: '0 0 20px rgba(255, 153, 51, 0.4)',
        'glow-green': '0 0 20px rgba(19, 136, 8, 0.35)',
        'glow-navy': '0 0 24px rgba(6, 3, 141, 0.25)',
        glass: '0 8px 32px rgba(6, 3, 141, 0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-slide-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'spin-once': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'bounce-dot': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(-6px)', opacity: '1' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out both',
        'fade-slide-up': 'fade-slide-up 0.5s cubic-bezier(0.22,1,0.36,1) both',
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'pulse-ring': 'pulse-ring 1.4s ease-out infinite',
        'spin-once': 'spin-once 0.6s ease-in-out both',
        'slide-in-right': 'slide-in-right 0.35s cubic-bezier(0.22,1,0.36,1) both',
        'bounce-dot': 'bounce-dot 1.2s ease-in-out infinite',
        'gradient-x': 'gradient-x 4s ease infinite',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
