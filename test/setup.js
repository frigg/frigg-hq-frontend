/* eslint-env node, mocha */

import _ from 'lodash';
import jsdom from 'jsdom';
import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiHaveXpath from 'chai-have-xpath';
import chaiHaveReactComponent from 'chai-have-react-component';
import chaiAsPromised from 'chai-as-promised';

import * as fixtures from './fixtures';

chai.use(chaiHaveXpath);
chai.use(chaiHaveReactComponent);
chai.use(chaiAsPromised);
chai.use(sinonChai);

global.chai = chai;
global.expect = chai.expect;
global.sinon = sinon.sandbox.create();

afterEach(() => global.sinon.restore());

// throw warnings, this is a way to deal with react warnings
console.warn = message => { // eslint-disable-line no-console
  throw new Error(message);
}
console.error = message => { // eslint-disable-line no-console
  throw new Error(message);
}

if (typeof global.window == 'undefined') {
  global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
  global.window = global.document.defaultView;

  global.fixtures = fixtures;
}


_.forOwn(window, function (value, key) {
  if (!window.hasOwnProperty(key)) return;
  if (key in global) return;

  global[key] = value;
});
