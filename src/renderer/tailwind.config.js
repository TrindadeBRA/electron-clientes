/** @type {import('tailwindcss').Config} */
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
  plugins: [],
}

