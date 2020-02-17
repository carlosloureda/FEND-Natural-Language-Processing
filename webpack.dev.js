const path = require("path");

module.exports = env => {
  return {
    entry: "./src/server/index.js",
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
        }
      ]
    },
    plugins: []
  };
};
