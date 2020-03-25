const WebpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.extension.js");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = env => {
  let config = {
		mode: "production",
    plugins: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6
        }
      })
    ]
  };
  return WebpackMerge(commonConfig(env), config);
};
