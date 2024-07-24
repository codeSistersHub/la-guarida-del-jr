/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				siswhite: '#e3e3e3',
				sisblack: '#121212',
				accentblue: '#406cd6',
				light_msgbg: '#d9e2f7',
				light_bar: '#f6f6f6',
				light_addbtn: '#1d3161',
				light_login: '#8eaae9',
				light_tags: '#8eaae9',
				light_footer: '#d9e2f7',
				dark_bg: '#1d3161',
				dark_msgbg: '#406cd6',
				dark_addbtn: '#8eaae9',
				dark_bar: '#48587c',
				dark_footer: '#243c78',
				dark_userpass: '#243c78',
				taggreen: '#d5eee8',
				tagyellow: '#ebefd8',
				taglilac: '#d7def0',
			},
			boxShadow: {
				custom_black: '0px 2px 5px rgba(0, 0, 0, 0.2)',
			},
		},
	},
	plugins: [],
};
