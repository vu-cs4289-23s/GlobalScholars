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
        'pumpkin': 'rgb(243, 114, 44)',
        'pure-orange': 'rgb(248, 150, 30)',
        'peach': 'rgb(249, 132, 74)',
        'dark-yellow': 'rgb(249, 199, 79)',
        'yellow-green': 'rgb(236, 243, 158)',
        'sea-foam': 'rgb(198, 235, 190)',
        'electric-lime': 'rgb(198, 235, 67)',
        'teal': 'rgb(67, 170, 139)',
        'dark-teal': 'rgb(77, 144, 142)',
        'light-blue': 'rgb(171, 216, 237)',
        'medium-blue': 'rgb(37, 174, 208)',
        'dark-blue': 'rgb(4, 107, 159)',
        'light-lavender': 'rgb(232, 194, 202)',
        'lavender': 'rgb(209, 179, 196)',
        'dark-lavender': 'rgb(179, 146, 172)',
        'baby-pink': 'rgb(255, 165, 171)',
        'dark-pink': 'rgb(218, 98, 125)',
        'pink-cream': 'rgb(249, 219, 189)',
      }
    },
  },
  plugins: [],
};
