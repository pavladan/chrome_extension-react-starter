/* global require module */

const WebpackMerge = require("webpack-merge");
const ChromeExtensionReloader = require("webpack-chrome-extension-reloader");
const commonConfig = require("./webpack.extension.js");

const reloader = new ChromeExtensionReloader({
  port: 9090, // Which port use to create the server
  reloadPage: true, // Force the reload of the page also
  entries: {
    // The entries used for the content/background scripts
    contentScript: "content-script", // Use the entry names, not the file name or the path
    background: "background" // *REQUIRED
  }
});

module.exports = env => {
  return WebpackMerge(commonConfig(env), {
    devtool: "inline-source-map",
    plugins: [reloader]
  });
};
