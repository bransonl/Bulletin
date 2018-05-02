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
    "./src/index.tsx",
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
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
          "awesome-typescript-loader",
        ],
        include: path.resolve(__dirname, "src"),
        exclude: path.resolve(__dirname, "node_modules"),
      },
      {
        test: /\.js$/,
        use: "source-map-loader",
        exclude: path.resolve(__dirname, "node_modules"),
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
          {
            loader: "postcss-loader",
            options: {
              plugins: () => {
                return [
                  require("precss"),
                  require("autoprefixer"),
                ];
              },
            },
          },
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
