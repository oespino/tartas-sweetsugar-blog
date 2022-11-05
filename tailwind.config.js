/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'list-disc',
    'list-inside',
    'list-decimal',
    'text-2xl',
    'text-lg',
    'font-bold',
    'py-4',
    'p-4',
    'py-2',
    'italic'
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}
