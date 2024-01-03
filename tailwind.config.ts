import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      borderRadius: {
        md: "0.25rem",
      },
      colors: {
        background: "var(--dark-700)",
        foreground: "var(--white)",

        input: "var(--dark-900)",
        placeholder: "var(--gray-100)",

        primary: "var(--red-900)",
        secondary: "var(--green-900)",
        terciary: "var(--blue-900)",
        cancel: "var(--gray-300)",
      },
    },
  },
  plugins: [],
};
export default config;
