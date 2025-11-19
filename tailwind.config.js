/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/**/*.js", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#3662e3",
        secondary: "rgb(25 41 69)",
        surface: "#1a1d23",
        muted: "#9ca3af",
        accent: "#1f2933",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        card: "0 30px 80px rgba(0, 0, 0, 0.25)",
      },
      blur: {
        "3xl": "64px",
      },
      borderRadius: {
        "3xl": "2rem",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

