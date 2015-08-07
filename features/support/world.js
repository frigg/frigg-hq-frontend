var wd = require('wd');
var server = require('../../server');

var remote = wd.promiseChainRemote(); // wd.remote(); // this.browser will be available in step definitions

if (process.env.DEBUG) {
  // log status output from web driver
  remote.on('status', function(info) {
    console.log('\x1b[36m%s\x1b[0m', info);
  });

  // log commands from web driver
  remote.on('command', function(meth, path, data) {
    console.log(' > \x1b[33m%s\x1b[0m: %s', meth, path, data || '');
  });
}

var World = function World(callback) {
  this.browser = remote;

  this.browser.init({browserName: 'chrome'}, function(err) {
    callback(err);
  }.bind(this));
};

exports.World = World;
