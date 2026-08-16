import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			borderRadius: {
				xl: '12px',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					selected: 'hsl(var(--card-selected))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
					locked: "hsl(var(--muted-locked))"

				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				quiz: {
					selected: {
						bg: "hsl(var(--quiz-selected-bg))",
						border: "hsl(var(--quiz-selected-border))",
						text: "hsl(var(--quiz-selected-text))",
					},
					correct: {
						bg: "hsl(var(--quiz-correct-bg))",
						border: "hsl(var(--quiz-correct-border))",
						text: "hsl(var(--quiz-correct-text))",
					},
				},

				yellow: {
					500: "#ffc800",
				},
				sky: {
					100: "#ddf4ff",
					300: "#84d8ff",
				},
				green: {
					100: "#d7ffb8",
					300: "#a5ed6e",
					500: "#58cc02",
					600: "#58a700"
				}
			},
			fontFamily: {
				// Overwriting 'sans' makes DIN the automatic default everywhere
				sans: ["var(--font-din)", "sans-serif"],

				// This lets you use 'font-feather' manually whenever you want headlines
				feather: ["var(--font-feather)", "sans-serif"],
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
