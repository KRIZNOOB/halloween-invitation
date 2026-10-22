/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spooky: {
          deep: '#09070f',
          surface: '#110d1a',
          card: 'rgba(18, 14, 27, 0.75)',
          cardHover: 'rgba(26, 20, 38, 0.85)',
          input: '#120e1c',
          orange: '#ea580c',
          orangeBright: '#f97316',
          purple: '#8b5cf6',
          purpleBright: '#a78bfa',
          purpleSubtle: 'rgba(139, 92, 246, 0.12)',
          textMuted: '#9ca3af',
          textDim: '#6b7280',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        creepy: ['Creepster', 'cursive'],
      },
      boxShadow: {
        softOrange: '0 8px 30px rgba(234, 88, 12, 0.15)',
        softPurple: '0 8px 30px rgba(139, 92, 246, 0.12)',
        card: '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
}
