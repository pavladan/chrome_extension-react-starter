const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const babelDecoratorPlugin = require("@babel/plugin-proposal-decorators")
  .default;
const babelTransformClassPlugin = require("@babel/plugin-proposal-class-properties")
  .default;
const CleanWebpackPlugin = require("clean-webpack-plugin");
const paths = require("./webpack/paths");

const clean = new CleanWebpackPlugin([paths.outputDir]);
const extractCSS = new ExtractTextPlugin("styles/styles.css");
const optimizeCSS = new OptimizeCssAssetsPlugin();

const dotenv = require("dotenv");
const dotenvConfig = dotenv.config();

module.exports = env => {
  const environmentPlugin = new webpack.EnvironmentPlugin({
    ...dotenvConfig.parsed
  });
  return {
    mode: "development",
    entry: "index.js",
    resolve: {
      extensions: [".js", ".jsx"]
    },
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
              publicPath: ""
            }
          }
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "icons/[name].[ext]",
              publicPath: ""
            }
          }
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        },
        {
          test: /\.(scss|sass)$/,
          loader: "style-loader!css-loader!sass-loader"
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              [babelDecoratorPlugin, { legacy: true }],
              [babelTransformClassPlugin, { loose: true }],
              "@babel/plugin-syntax-dynamic-import"
            ]
          }
        },
        {
          test: /.html$/,
          loader: "html-loader"
        }
      ]
    },
    plugins: [clean, extractCSS, optimizeCSS, environmentPlugin],
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, paths.outputDir),
      publicPath: ""
    }
  };
};
