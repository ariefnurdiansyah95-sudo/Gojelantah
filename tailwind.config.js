/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      // GoJelantah palette — hijau (eco/ramah lingkungan) sebagai aksen
      // utama, amber/emas (nilai dari jelantah yang "berharga") sebagai
      // aksen kedua. Pola token sama kayak proyek ViralForge (accent.*)
      // biar gampang di-reuse di globals.css.
      colors: {
        accent: {
          DEFAULT: '#059669', // emerald-600
          light: '#34d399',   // emerald-400
          dark: '#047857',    // emerald-700
        },
        gold: {
          DEFAULT: '#f59e0b', // amber-500
          light: '#fbbf24',   // amber-400
          dark: '#b45309',    // amber-700
        },
        surface: {
          dark: '#0b1210',
        },
      },
    },
  },

  plugins: [],
}
