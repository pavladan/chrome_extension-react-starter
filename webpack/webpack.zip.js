const WebpackMerge = require("webpack-merge");
const paths = require("./paths");
const prodConfig = require("./webpack.build.js");
const WebpackZipPlugin = require("webpack-zip-plugin");
const config = require("./extensionManifestEnv");

module.exports = env => {
  return WebpackMerge(prodConfig(env), {
    plugins: [
      new WebpackZipPlugin({
        initialFile: paths.outputDir,
        endPath: paths.releaseDir,
        zipName: config.name.replace(/[. ]/g,'_')
      })
    ]
  });
};
