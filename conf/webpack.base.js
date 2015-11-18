/* eslint-env node */
/* eslint-disable no-var */
var path = require('path');

var root = path.resolve(__dirname, '..');

module.exports = {
  entry: {
    'bundle': './src/index.js',
  },
  output: {
    path: path.join(root, 'public'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|vendor/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.json$/,
        loaders: ['json-loader'],
      },
      {
        test: /\.styl$/,
        loaders: ['style-loader', 'css-loader', 'stylus-loader'],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(otf|eot|png|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url',
      },
    ],
  },
};
