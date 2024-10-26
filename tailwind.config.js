/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["content/**/*.md", "layouts/**/*.html"],
  safelist: [
    "bg-indigo-50",
    "bg-transparent",
    "text-indigo-700"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
