const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const glob = require("glob");


module.exports = {
  mode: "production",
  entry: {
    "bundle.js": glob
     .sync("build/static/?(js|css)/main.*.?(js|css)")
     .map((f) => path.resolve(__dirname, f)),
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "weather-component.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: { 
    minimizer: [new TerserWebpackPlugin({ extractComments: false })],
  },
};
