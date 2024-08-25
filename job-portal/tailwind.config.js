//*@type {import('tailwindcss').Config} //
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  
  ],
  theme: {
    extend: {
     colors:{
      "primary" : "#010203",
      "blue" : "#3575E2"
     }
    },
  },
  plugins: [],
};
