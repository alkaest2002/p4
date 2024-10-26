/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["content/**/*.md", "layouts/**/*.html"],
  safelist: [
    "bg-indigo-50",
    "italic",
    "text-gray-400"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
