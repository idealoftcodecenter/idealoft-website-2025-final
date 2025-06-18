import { a } from 'framer-motion/dist/types.d-CtuPurYT';

/** @type {import('tailwindcss').Config} */
export default {
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
			},
			fontFamily: {
				sans: ['"Atkinson Hyperlegible"', 'sans-serif'],
				serif: ['var(--font-eb-garamond)', 'serif'],
				atkinson: ['"Atkinson Hyperlegible"', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
