/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      colors: {
        customWhite:"#fbf8ff",
        customPurple:'#9681ea',
        customDarkPurple: '#211c31',
              },
    extend: {
      boxShadow: {
              'text-glow': '0 0 5px rgba(150, 129, 234, 0.8), 0 0 10px rgba(150, 129, 234, 0.6), 0 0 15px rgba(150, 129, 234, 0.4)',
              'text-glow-hover': '0 0 8px rgba(150, 129, 234, 1), 0 0 15px rgba(150, 129, 234, 0.8), 0 0 25px rgba(150, 129, 234, 0.6)'
                  },
      fontFamily: {
        'jersey':['"Jersey 10"', 'sans-serif']
                  },
      keyframes: {
              flip: {
                '0%': { transform: 'rotateY(0deg)' },
                '100%': { transform: 'rotateY(180deg)' },
              },
              unflip: {
                '0%': { transform: 'rotateY(180deg)' },
                '100%': { transform: 'rotateY(0deg)' },
              },
            },
            animation: {
              flip: 'flip 0.5s ease-in-out',
              unflip: 'unflip 0.5s ease-in-out',
            },
          },
  },
  plugins: [
          function ({ addUtilities }) {
              addUtilities({
                '.text-shadow-glow': {
                  textShadow: '0 0 5px rgba(150, 129, 234, 0.8), 0 0 10px rgba(150, 129, 234, 0.6), 0 0 15px rgba(150, 129, 234, 0.4)',
                },
                '.text-shadow-glow-hover': {
                  textShadow: '0 0 8px rgba(150, 129, 234, 1), 0 0 15px rgba(150, 129, 234, 0.8), 0 0 25px rgba(150, 129, 234, 0.6)',
                },
              }, ['responsive', 'hover']);
            },
          ],
}

