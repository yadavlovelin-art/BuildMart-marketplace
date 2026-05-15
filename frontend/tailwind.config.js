/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './services/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#131921',
          accent: '#FF9900',
          bg: '#f3f3f3',
          text: '#111111',
        },
      },
      boxShadow: {
        card: '0 10px 25px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
