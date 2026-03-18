/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0ff',
          200: '#dce4ff',
          300: '#bdcaff',
          400: '#8ca1ff',
          500: '#5c72ff',
          600: '#3d4dff',
          700: '#2c36e8',
          800: '#232bb8',
          900: '#212a91',
          950: '#141757',
        },
      },
      backgroundImage: {
        'space-gradient': "linear-gradient(to bottom right, #000000, #130f40, #000000)",
        'glass-gradient': "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }
    },
  },
  plugins: [],
}
