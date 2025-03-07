/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        'slideIn': {
          from: {
            width: '0',
          },
          to: {
            width: 'var(--radix-collapsible-content-width)',
          },
        },
        'slideOut': {
          from: {
            width: 'var(--radix-collapsible-content-width)',
          },
          to: {
            width: '0',
          },
        },
      },
      animation: {
        'slideIn': 'slideIn 0.3s ease-in-out',
        'slideOut': 'slideOut 0.3s ease-in-out',
      },
    },
  },
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        '.region-drag': {
          '-webkit-app-region': 'drag'
        },
        '.region-no-drag': {
          '-webkit-app-region': 'no-drag'
        },
      })
    })
  ],
}

