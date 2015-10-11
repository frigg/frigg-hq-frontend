/* eslint-env node */
/* eslint-disable no-var */
var _ = require('lodash');
var webpack = require('webpack');

var base = require('./webpack.base');

module.exports = _.assign({}, base, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
});
