import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["roboto"],
        serif: ['serif'],
        sans: ['sans-serif'],
        mono: ['monospace'],
        cursive: ['cursive'],
        fantasy: ['fantasy'],
        'system-ui': ['system-ui'],
        'ui-serif': ['ui-serif'],
        'ui-sans-serif': ['ui-sans-serif'],
        'ui-monospace': ['ui-monospace'],
        'ui-rounded': ['ui-rounded'],
        emoji: ['emoji'],
        math: ['math'],
        fangsong: ['fangsong'],
      }
    },
  },
  plugins: [],
};
export default config;
