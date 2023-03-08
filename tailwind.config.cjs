/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    "bg-blue-500",
    "bg-indigo-500",
    "bg-blue-300",
    "bg-amber-300",
    "bg-rose-300",
    "bg-indigo-300",
    "bg-pink-300",
    "bg-blue-100",
    "bg-amber-100",
    "bg-rose-100",
    "bg-indigo-100",
    "bg-pink-100",
    "text-blue-50",
    "text-amber-50",
    "text-rose-50",
    "text-indigo-50",
    "text-pink-50",
    "ring-blue-300",
    "ring-amber-300",
    "ring-rose-300",
    "ring-indigo-300",
    "ring-pink-300",
    "shadow-blue-200",
    "shadow-amber-200",
    "shadow-rose-200",
    "shadow-indigo-200",
    "shadow-pink-200",
  ],
  content: ["./index.html", "./frontend/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'blue-rgba': 'rgba(39, 74, 104)',
        'blue-light': 'rgb(192,209,225)',
      }
    },
  },
  plugins: [],
};
