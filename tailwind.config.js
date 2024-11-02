/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["content/**/*.md", "layouts/**/*.html"],
  safelist: [
    "bg-indigo-50",
    "bg-transparent",
    "block",
    "border-red-700",
    "focus:border-indigo-700",
    "focus:ring-indigo-700", 
    "invisible",
    "ring-red-700",
    "ring-red-700", 
    "text-indigo-700",
    "text-red-700",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
