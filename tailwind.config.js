/** @type {import('tailwindcss').Config} */
export default {
	content: [],
	theme: {
		container: {
			center: true,
		},

		extend: {
			fontFamily: {
				chakra: ['Chakra Petch', 'sans-serif'],
				roboto: ['Roboto', 'sans-serif'],
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				maintheme: {
					primary: '#0F172A',
					'primary-content': '#ffffff',
					secondary: '#93032e',
					'secondary-content': '#ffffff',
					accent: '#ff9f1c',
					neutral: '#B3B3B3',
					'base-200': '#CBD5E1',
					'base-300': '#94A3B8',
					'base-content': '#2e2e2e',
					'--btn-bg-color-hover': '#334155',
					'--rounded-btn': '9999rem', // border radius rounded-btn utility class, used in buttons and similar element
					'--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
					'--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
					'--animation-btn': '0.25s', // duration of animation when you click on button
					'--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
					'--btn-focus-scale': '0.95', // scale transform of button when you focus on it
					'--border-btn': '1px', // border width of buttons
					'--tab-border': '1px', // border width of tabs
					'--tab-radius': '0.5rem', // border radius of tabs
				},
			},
		],
	},
};
