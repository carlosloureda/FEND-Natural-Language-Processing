const HtmlWebPackPlugin = require("html-webpack-plugin");
// const path = require("path");

module.exports = env => {
  return {
    entry: "./src/client/index.js",
    target: "node",
    mode: "development",
    devtool: "source-map",
    stats: "verbose",
    module: {
      rules: [
        {
          test: "/.js$/",
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/client/views/index.html",
        filename: "./index.html"
      })
    ]
  };
};
