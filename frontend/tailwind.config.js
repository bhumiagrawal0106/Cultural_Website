/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        india: {
          orange: '#FF9933',
          white: '#FFFFFF',
          green: '#138808',
          navy: '#06038D',
          bg: '#F8F9FA',
          text: '#212121',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Noto Sans', 'Noto Sans Devanagari', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -6px rgba(6, 3, 141, 0.12)',
      },
    },
  },
  plugins: [],
};
