const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = new (require('html-webpack-plugin'))({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});

const BootstrapDependenciesPlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery',
  Popper: ['popper.js', 'default']
});

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  resolve: {
    extensions: [
      '.ts', '.tsx', '.js', '.json'
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader'
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: 'source-map-loader'
      },
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css?$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss?$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          'url-loader'
        ]
      }
    ]
  },
  plugins: [
    HtmlWebpackPlugin,
    BootstrapDependenciesPlugin
  ],
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: '8080'
  }
};
