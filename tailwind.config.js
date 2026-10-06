/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#050713',
        surface: '#0a0d22',
        'surface-elevated': '#101533',
        'surface-border': '#1c2452',
        cyber: {
          bg: '#050713',
          surface: '#090d24',
          card: '#0d1230',
          border: '#1f295c',
          cyan: '#00f0ff',
          pink: '#ff007f',
          magenta: '#ff1493',
          yellow: '#ffe600',
          green: '#00ff9d',
          purple: '#9d4edd',
          orange: '#ff5400'
        },
        primary: {
          50: '#ecfeff',
          100: '#cffafe',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
        accent: {
          blue: '#00f0ff',
          emerald: '#00ff9d',
          amber: '#ffe600',
          violet: '#9d4edd',
          rose: '#ff007f'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        orbitron: ['Orbitron', 'JetBrains Mono', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px -3px rgba(0, 240, 255, 0.45)',
        'neon-pink': '0 0 20px -3px rgba(255, 0, 127, 0.45)',
        'neon-yellow': '0 0 20px -3px rgba(255, 230, 0, 0.45)',
        'neon-green': '0 0 20px -3px rgba(0, 255, 157, 0.45)',
        'arcade-card': '0 0 25px -5px rgba(0, 240, 255, 0.15), 0 8px 24px -4px rgba(0, 0, 0, 0.8)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'flicker': 'flicker 3s infinite',
        'neon-glow': 'neonGlow 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '0.99' },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.4' },
        },
        neonGlow: {
          '0%': { filter: 'drop-shadow(0 0 4px rgba(0, 240, 255, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 12px rgba(255, 0, 127, 0.7))' },
        }
      }
    },
  },
  plugins: [],
}
