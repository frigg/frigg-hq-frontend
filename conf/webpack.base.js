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
  resolve: {
    alias: {
      'react': 'react/addons',
    },
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
        exclude: /node_modules|vendor/,
        loaders: ['json-loader'],
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
