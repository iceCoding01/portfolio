/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        'main-color': '#0a174e',
        'text-color': '#0a174e', 
        'bg-color': '#ffffff',
        'secondary-color': '#133b7a',
        'accent': '#0066cc',
        'glass': {
          'primary': 'rgba(10, 23, 78, 0.97)',
          'secondary': 'rgba(19, 59, 122, 0.95)',
          'light': 'rgba(255, 255, 255, 0.1)',
          'border': 'rgba(255, 255, 255, 0.2)'
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'primary': ['Poppins', 'sans-serif']
      },
      backdropBlur: {
        'glass': '25px',
        'navbar': '20px'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'fadeInUp': 'fadeInUp 0.8s ease-out',
        'slideInRight': 'slideInRight 0.3s ease-out',
        'slideOutRight': 'slideOutRight 0.3s ease-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        shimmer: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' }
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(50px)'
          },
          '100%': {
            opacity: '1', 
            transform: 'translateY(0)'
          }
        },
        slideInRight: {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        slideOutRight: {
          '0%': {
            transform: 'translateX(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateX(100%)',
            opacity: '0'
          }
        }
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(10, 23, 78, 0.3)',
        'glass-hover': '0 12px 48px rgba(10, 23, 78, 0.4)',
        'premium': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'premium-hover': '0 8px 25px rgba(0, 0, 0, 0.15)'
      },
      borderRadius: {
        'glass': '1.2rem',
        'premium': '2rem'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '120': '30rem'
      },
      zIndex: {
        '100': '100',
        '1000': '1000',
        '10000': '10000',
        '100000': '100000'
      }
    },
  },
  plugins: [],
}
