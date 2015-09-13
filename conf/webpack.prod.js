/* eslint-env node */
/* eslint-disable no-var */
var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');

var base = require('./webpack.base');

module.exports = _.assign({}, base, {
  resolve: {
    alias: {
      'react': path.resolve(__dirname, '..', 'node_modules/react/dist/react-with-addons.min'),
      'react-router': path.resolve(__dirname, '..', 'node_modules/react-router/umd/ReactRouter.min'),
    },
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
  ],
});
