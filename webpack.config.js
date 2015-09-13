module.exports = require('./conf/webpack.' + (process.env.WEBPACK_ENV || 'dev'));

if (!!process.env.VERBOSE) {
  console.log(JSON.stringify(module.exports, null, 2));
}
