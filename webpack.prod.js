const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const { resolve } = require("path");

module.exports = env => {
  return {
    entry: "./src/client/index.js",
    target: "web",
    mode: "production",
    devtool: "source-map",
    stats: "verbose",
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    module: {
      rules: [
        {
          test: "/.js$/",
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        // template: "./src/client/views/index.html",
        template: resolve(__dirname, "src/client/views", "index.html"),
        filename: "./index.html"
      }),
      new CleanWebpackPlugin({
        // Simulate the removal of files
        dry: true,
        // Write Logs to Console
        verbose: true,
        // Automatically remove all unused webpack assets on rebuild
        cleanStaleWebpackAssets: true,
        protectWebpackAssets: false
      }),
      new Dotenv(),
      new WorkboxPlugin.GenerateSW(),
      new MiniCssExtractPlugin({ filename: "[name].css" })
    ]
  };
};
