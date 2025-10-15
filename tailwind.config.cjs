/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'custom-gold': '#DECEA8',
      },
      boxShadow: {
        'green-glow': '0 0 15px 5px rgba(52, 211, 153, 0.3)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  safelist: [
    // Padrões existentes
    'py-8', 'py-10', 'whitespace-normal', 'flex-1', 'items-center',
    
    // Tamanhos de texto responsivos
    'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl',
    'sm:text-2xl', 'sm:text-3xl', 'sm:text-4xl', 'sm:text-5xl', 'sm:text-6xl', 'sm:text-7xl',
    'md:text-2xl', 'md:text-3xl', 'md:text-4xl', 'md:text-5xl', 'md:text-6xl', 'md:text-7xl',
    'lg:text-2xl', 'lg:text-3xl', 'lg:text-4xl', 'lg:text-5xl', 'lg:text-6xl', 'lg:text-7xl',

    // Layout e espaçamento responsivo
    'p-4', 'p-8', 'p-12',
    'md:p-4', 'md:p-8', 'md:p-12',
    'py-2', 'py-3', 'py-4',
    'px-6', 'px-8', 'px-12',
    'gap-4', 'gap-8',
    'md:flex-row',
    'md:items-center',
    'md:text-left',
    'md:w-1/3',
  ],
}