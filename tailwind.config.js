/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-primary-fixed-variant": "#663e00",
        "primary-fixed": "#ffddb9",
        "error-container": "#ffdad6",
        "error": "#ba1a1a",
        "surface-container-lowest": "#ffffff",
        "surface-container-highest": "#e1e3e4",
        "on-secondary-container": "#745f43",
        "on-primary-fixed": "#2b1700",
        "outline-variant": "#d8c3af",
        "surface-container-high": "#e7e8e9",
        "primary": "#835100",
        "tertiary": "#795600",
        "primary-container": "#a46700",
        "primary-fixed-dim": "#ffb962",
        "tertiary-container": "#996d00",
        "on-tertiary-fixed": "#271900",
        "on-surface-variant": "#524435",
        "on-error": "#ffffff",
        "inverse-surface": "#2e3132",
        "tertiary-fixed": "#ffdea8",
        "secondary-container": "#f7dbb8",
        "on-secondary-fixed": "#271904",
        "tertiary-fixed-dim": "#fdbb2f",
        "secondary-fixed-dim": "#ddc2a0",
        "on-secondary": "#ffffff",
        "surface": "#f8f9fa",
        "on-tertiary-container": "#fffbff",
        "on-tertiary": "#ffffff",
        "on-error-container": "#93000a",
        "on-background": "#191c1d",
        "secondary-fixed": "#fadebb",
        "surface-tint": "#865300",
        "surface-container-low": "#f2f4f5",
        "surface-variant": "#e1e3e4",
        "surface-dim": "#d8dadb",
        "outline": "#857463",
        "on-primary-container": "#fffbff",
        "secondary": "#6f5b3f",
        "on-tertiary-fixed-variant": "#5e4200",
        "on-surface": "#191c1d",
        "inverse-primary": "#ffb962",
        "background": "#f8f9fa",
        "on-primary": "#ffffff",
        "surface-container": "#eceeef",
        "on-secondary-fixed-variant": "#56442a",
        "surface-bright": "#f8f9fa",
        "inverse-on-surface": "#eff1f2"
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      fontFamily: {
        "headline": ["Lexend", 'sans-serif'],
        "body": ["Plus Jakarta Sans", 'sans-serif'],
        "label": ["Plus Jakarta Sans", 'sans-serif']
      },
      keyframes: {
        popup: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '60%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      animation: {
        popup: 'popup 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
