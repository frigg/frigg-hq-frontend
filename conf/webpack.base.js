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
  resolve: {
    alias: {
      'react': path.resolve(__dirname, '..', 'node_modules/react/dist/react-with-addons'),
      'react-router': path.resolve(__dirname, '..', 'node_modules/react-router/umd/ReactRouter'),
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
