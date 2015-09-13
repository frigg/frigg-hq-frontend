/* eslint-env node */
import _ from 'lodash';
import jsdom from 'jsdom';
import * as fixtures from './fixtures';


var doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
var win = doc.defaultView;

global.fixtures = fixtures;
global.document = doc;
global.window = win;

_.forOwn(win, function (value, key) {
  if (!window.hasOwnProperty(key)) return;
  if (key in global) return;

  global[key] = value;
});
