export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#646cff",
        primaryHover: "#535bf2",
        backgroundDark: "#242424",
        backgroundLight: "#ffffff",
      },
      fontFamily: {
        sans: ["system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem", // 8px
      },
      lineHeight: {
        relaxed: "1.5",
      },
    },
  },
  darkMode: "media", // respects prefers-color-scheme
};
