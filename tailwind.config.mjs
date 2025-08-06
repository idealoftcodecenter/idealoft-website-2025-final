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
				blue: "var(--blue)",
				cedar: "var(--cedar)",
				neonGreen: "var(--neonGreen)",
				ilGreen: "var(--ilGreen)",
				tabGrey: "var(--tabGrey)",
				ilPink: "var(--ilPink)",
				ilBgGrey: "var(--ilBgGrey)"
			},
			fontFamily: {
				sans: ['"Atkinson Hyperlegible"', 'sans-serif'],
				serif: ['var(--font-eb-garamond)', 'serif'],
				atkinson: ['"Atkinson Hyperlegible"', 'sans-serif'],
				oswald: ['var(--font-oswald)', 'sans-serif'],
				display: ['var(--font-oswald)', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
