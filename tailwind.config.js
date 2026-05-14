/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f8fcfd',
        surface: '#ffffff',
        'surface-soft': '#f0f6f9',
        text: '#1a2b3c',
        muted: '#5e6f80',
        primary: '#1e4a6d',
        'primary-2': '#143550',
        accent: '#d89b65',
        'accent-soft': '#f6ebd8',
        border: 'rgba(30, 74, 109, 0.08)',
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0 16px 40px -10px rgba(30, 74, 109, 0.08)',
        'custom-hover': '0 24px 50px -12px rgba(30, 74, 109, 0.15)',
      },
      borderRadius: {
        'lg': '32px',
        'md': '20px',
        'sm': '12px',
      },
      maxWidth: {
        'container': '1240px',
      },
      transitionDuration: {
        'smooth': '400ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}