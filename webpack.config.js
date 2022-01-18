const defaultConfig = require( './node_modules/@wordpress/scripts/config/webpack.config.js' );

module.exports = {
	...defaultConfig,
	entry: {
		global: './src/index.js',
		//frontend: './src/frontend.js',
	},
};
