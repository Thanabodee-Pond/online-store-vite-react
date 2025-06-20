/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#fb7954',
          'dark': '#242424',
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
        },
        container: {
          center: true,
          padding: {
            DEFAULT: '1rem',
            sm: '2rem',
            lg: '4rem',
          },
        },
      },
    },
    plugins: [],
  }