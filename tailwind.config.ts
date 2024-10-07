import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#6763ec',
        'primary-dark': '#620BD1',
        secondary: '#56c9b9',
        'secondary-dark': '#308E9C',
        'secondary-light': '#CEF5F0',
        dark: '#221F1F',
        light: '#FDFDFD',
      },
    },
  },
  plugins: [],
};
export default config;
