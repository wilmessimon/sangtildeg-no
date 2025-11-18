import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F1E8",
        beige: "#E8DFD0",
        warm: "#D4C5B0",
        "text-primary": "#3D3530",
        "text-secondary": "#6B5F54",
        "text-light": "#9B8F82",
        "accent-pink": "#E8D5D0",
        "accent-sage": "#C5D3C8",
        "accent-gold": "#D4AF7A",
      },
      fontFamily: {
        serif: ["var(--font-crimson)"],
        heading: ["var(--font-playfair)"],
        handwriting: ["var(--font-dancing)"],
        sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

