const webpack = require("webpack");
module.exports = {
	webpack: function override(config, _) {

		return {
			...config,
			plugins: [
				...config.plugins,
				new webpack.ProvidePlugin({
					$: "jquery",
					jQuery: "jquery",
			
					"window.jQuery": "jquery",
				}),
			],

		};
	},
};
