/* tslint:disable
  ordered-imports
  object-literal-key-quotes
  object-literal-sort-keys
*/

import * as webpack from "webpack";
import * as path from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

const config: webpack.Configuration = {
  entry: [
    "babel-polyfill",
    "react-hot-loader/patch",
    "./src/index.tsx",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [
      ".webpack.js", ".web.js", ".ts", ".tsx", ".js",
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          "react-hot-loader/webpack",
          "awesome-typescript-loader",
        ],
        include: path.resolve(__dirname, "src"),
        exclude: path.resolve(__dirname, "node_modules"),
      },
      {
        test: /\.js$/,
        use: "source-map-loader",
        enforce: "pre",
      },
      {
        test: /\.css?$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.scss?$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: [
          "file-loader",
        ],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          "url-loader",
        ],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      chunksSortMode: "dependency",
      filename: "index.html",
      inject: "body",
      template: path.resolve(__dirname, "./src/index.html"),
    }),
    new webpack.ProvidePlugin({
      "$": "jquery",
      "jQuery": "jquery",
      "window.jQuery": "jquery",
      "Popper": ["popper.js", "default"],
    }),
  ],
  devtool: "eval",
  devServer: {
    host: "0.0.0.0",
    port: "8080",
    historyApiFallback: true,
    hot: true,
    progress: true,
  },
};

export default config;

/* tslint:enable
  object-literal-key-quotes
  object-literal-sort-keys
  trailing-comma
*/
