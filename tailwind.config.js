/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",//si on a un autre html file contenant html , on doit le specifier hna
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    backgroundImage: {
      'custom-background': "url('/Background.png')", // Adjust the path accordingly
    },},},
  plugins: [],
 };
 
 
 