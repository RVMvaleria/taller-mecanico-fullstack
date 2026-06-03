/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        steel: '#1E40AF',
        slateDark: '#334155',
        slateLight: '#E2E8F0'
      },
      boxShadow: {
        premium: '0 20px 50px rgba(15, 23, 42, 0.14)'
      },

//para el carrusel de las marcas
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      }

    }
  },
  plugins: []
};