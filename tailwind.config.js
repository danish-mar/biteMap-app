/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FF9800', // Orange 500
          dark: '#F57C00',  // Orange 700
          DEFAULT: '#FF9800',
        },
        accent: {
          light: '#FFE0B2', // Orange 100
          dark: '#E65100',  // Orange 900
          DEFAULT: '#FF9800',
        },
        background: {
          light: '#FFF8E1', // Amber 50
          dark: '#121212',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1E1E1E',
        },
        text: {
          light: '#3E2723', // Brown 900
          dark: '#FFF3E0',  // Orange 50
        }
      },
    },
  },
  plugins: [],
}