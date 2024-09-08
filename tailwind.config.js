/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "fire-engine-red-500": "#FF002E",
        "fire-engine-red-700": "#B80022",
      },
      maxWidth: {
        "[180px]": "180px",
      },
      width: {
        "[90%]": "90%",
        "[190px]": "190px",
      },
    },
  },
  plugins: [],
};
