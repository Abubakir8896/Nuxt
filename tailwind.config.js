/** @type {import('tailwindcss').Config} */
export default {
	content: ['./{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#F7931E',
				kulrang: '#EDE9E9',
			},
			fontFamily: {
				roboto: 'Roboto',
			},
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
		},
	},
	content: [
		'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
		'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
	  ],
	  plugins: [
		  require('flowbite/plugin')
	  ],
}
