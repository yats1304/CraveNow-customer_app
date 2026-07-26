/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FF5A1F",
        secondary: "#FF8A00",
        accent: "#E53935",

        background: "#FFFFFF",
        surface: "#FFF7F3",

        text: "#111827",
        muted: "#6B7280",

        success: "#16A34A",
        warning: "#F59E0B",
        danger: "#DC2626",

        border: "#E5E7EB",
      },
    },
  },
  plugins: [],
};
