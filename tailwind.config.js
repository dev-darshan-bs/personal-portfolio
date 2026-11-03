/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
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
        background: "var(--background)",
        "background-light": "var(--backgroundLight)",
        foreground: "var(--textBody)",
        title: "var(--textTitle)",
        muted: "var(--textLight)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--onPrimary)",
        },
        accent: "var(--accent)",
        error: "var(--error)",
      },
      fontFamily: {
        sans: ["var(--fontStack)"],
        mono: ["var(--monoFontStack)"],
      },
    },
  },
  plugins: [],
};
