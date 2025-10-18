/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // This array tells Tailwind where your component files are located.
    // Adjust paths if your components are not in the 'src' folder.
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  
  // 🚨 Add the DaisyUI plugin here
  plugins: [require("daisyui")], 

  // 🚨 OPTIONAL: DaisyUI Configuration (e.g., setting a default theme)
  daisyui: {
    themes: ["light", "dark", "cupcake"], // Enable themes you want to use
    // If you prefer the light theme by default:
    // darkTheme: "dark", 
  },
}