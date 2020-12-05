module.exports = {
	purge: [
		// Use *.tsx if using TypeScript
		'./pages/**/*.tsx',
		'./components/**/*.tsx',
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
