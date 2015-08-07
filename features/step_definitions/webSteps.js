var assert = require('assert');

var SERVER = process.env.SERVER || 'http://127.0.0.1:3000';

module.exports = function() {
  this.World = require('../support/world.js').World;

  this.Given(/^I am on "([^"]*)"$/, function(path, callback) {
    this.browser.get(SERVER + path, callback);
  });

  this.Then(/^I should see a list of builds$/, function(callback) {
    this.browser.waitForElementByClassName('build-list', 10000, function(err, value) {
      callback(err);
    });
  });

  this.Then(/^I should only see "([^"]*)" builds in the list$/, function(slug, callback) {
    this.browser
      .waitForElementByClassName('build-list', 10000)
      .hasElementByCssSelector('.build-list a:not([href*=' + slug + '])')
      .then(function(value) {
        assert.equal(value, false);
        callback();
      })
      .catch(callback);
  });
};
