/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-light': '#F3F4F6',
        'background-dark': '#010B18',
        'container-light': '#FFFFFF',
        'container-dark': '#1F2937',
        'primary-light': '#1E3A8A',
        'primary-dark': '#3B82F6',
        'hover-light': '#2563EB',
        'hover-dark': '#2563EB',  
      },
    },
  },
  darkMode: "class",
  plugins: [],
}

