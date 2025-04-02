/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        textBlue: "#1F70E0",
        bgGray: "#363636",
        azulButton: "#1C77FF",
        preto: '#242424'
      }
    },
    fontFamily: {
      sans: [
        'sans-serif',
        {
          fontFeatureSettings: '"cv11", "ss01"',
          fontVariationSettings: '"opsz" 32'
        },
      ],
    },
  },
  plugins: [],
} 