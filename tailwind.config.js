/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Sampled from the Canopy logo. Replace with exact brand hex when confirmed.
        canopy: {
          deep: '#123C22',
          mid: '#1E5631',
          leaf: '#4E8B32',
          // `light` is for dark backgrounds ONLY — it fails contrast on paper.
          light: '#8FD07A',
        },
        // Light theme used by every page body. The hero stays dark.
        paper: '#FAFAF7',
        'paper-sunk': '#F1F0EA',
        ink: '#14261B',
        'ink-soft': '#4A5A50',
        line: 'rgba(20,38,27,0.12)',
      },
      fontFamily: {
        body: ['Barlow', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
