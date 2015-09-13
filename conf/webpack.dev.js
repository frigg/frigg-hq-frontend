/* eslint-env node */
/* eslint-disable no-var */
var _ = require('lodash');

var base = require('./webpack.base');

module.exports = _.assign({}, base, {
  devtool: 'source-map',
  output: {
    devtoolLineToLine: true,
    filename: base.output.filename,
    path: base.output.path,
  },
});
