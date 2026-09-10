/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-black': '#050505',
        'space-gray': '#0A0A0A',
        'cyber-purple': '#8B5CF6', // Un violeta más vibrante y moderno
        'cyber-cyan': '#06B6D4',
        'cyber-emerald': '#10B981',
        'premium-white': '#F8FAFC',
        'muted-text': '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'neon-cyan': '0 0 20px rgba(6, 182, 212, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'premium-gradient': 'linear-gradient(135deg, #050505 0%, #121212 100%)',
        'mesh-gradient': 'radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.1) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(6, 182, 212, 0.1) 0, transparent 50%)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
