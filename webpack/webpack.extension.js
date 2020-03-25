const WebpackMerge = require("webpack-merge");
const commonConfig = require("../webpack.config.js");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");
const extensionConfig = require("./extensionManifestEnv.js");

const sourceDir = paths.src;

const htmlPopup = new HtmlWebpackPlugin({
  template: sourceDir + "/popup/popup.html",
  filename: "popup.html",
  chunks: ["popup"]
});
const copy = new CopyWebpackPlugin([
  {
    from: sourceDir + "/manifest.json",
    transform: function(content, path) {
      return content
        .toString()
        .replace(/#name#/g, extensionConfig.name[process.env.NODE_ENV])
        .replace(/#version#/g, extensionConfig.version)
        .replace(/#description#/g, extensionConfig.description)
    }
  },
  {
    from: sourceDir + "/icons",
    to: "icons"
  }
]);

module.exports = env => {
  return WebpackMerge(commonConfig(env), {
    entry: {
      background: "./" + sourceDir + "/background/index.js",
      popup: "./" + sourceDir + "/popup/index.js",
      "content-script": "./" + sourceDir + "/content/index.js"
    },
    plugins: [copy, htmlPopup]
  });
};
