module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        lightblue: {
          500: '#90c8f8', 
          600: '#77b5f0', 
        },
        gray: {
          900: '#1a1a1a', 
          500: '#8a8a8a', 
          300: '#d1d1d1', 
        },
      },
    },
  },
  plugins: [],
};
