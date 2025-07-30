/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      letterSpacing: {
        'extra-wide': '0.2px', // إضافة قيمة 0.2
      },
      animation: {
        spin: "spin 1s linear infinite", // دوران سريع
        "spin-slow": "spin 1.70s linear infinite", // دوران أبطأ
      },
    },
  },
  plugins: [],
}

