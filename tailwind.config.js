/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['Outfit', 'Arial', 'sans-serif'],
      },
      textColor: {
        sapphire: '#2c4fa3',
        lynch: '#667085',
        boston_blue: '#328ba9',
        zircon: '#F5F8FF',
        mist_blue: '#667085',
        cinder: '#0F1016',
        dark_gray: '#a9a9a9',
        kashmir_blue: '#58647B',
        grey: '#838383',
        pale_cornflower_blue: '#B8CAF5',
        manatee: '#848B9A',
        black_pearl: '#0D1316',
        manatee2: '#858D9D'
      },
      backgroundColor: {
        sapphire: '#2c4fa3',
        boston_blue: '#328ba9',
        catskill_white: '#F0F5F7',
        zircon: '#F5F8FF',
        alice_blue: '#E5EDFF',
        bright_star: '#E0E2E7',
        denim: '#0E6EA9',
        solitude: '#EAECF1',
        white_smoke: '#F5F5F5',
        manatee2: '#858D9D',
        pattens_blue: '#D5E9F0'
      },
      borderColor: {
        bright_star: '#E0E2E7',
        boston_blue: '#328ba9',
        sapphire: '#2c4fa3',
        manatee: '#848B9A',
        grey_suit: '#979798',
        white_smoke: '#F5F5F5',
        manatee2: '#858D9D'
      },
      fontSize: {
        'title': '32px',
        'stitle': '28px',
        'content': '15px',
        'scontent': '13px'
      },
      boxShadow: {
        'custom': '0px 4px 19.6px 0px rgba(0, 0, 0, 0.10)',
        'full': '0 3px 10px rgb(0,0,0,0.2)',
        'right-only': '10px 0 10px -2px rgba(0, 0, 0, 0.2)',
        'left-only': '-10px 0 10px -2px rgba(0, 0, 0, 0.2)'
      },
    },
  },
  plugins: [],
}

