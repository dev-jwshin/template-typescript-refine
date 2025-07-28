/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Ant Design과의 충돌을 방지하기 위한 설정
  corePlugins: {
    preflight: false, // Ant Design의 스타일을 보호
  },
} 