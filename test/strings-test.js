/* eslint-env mocha */
import {expect} from 'chai';

import {default as strings, _strings} from '../src/strings';

describe('strings loader', () => {
  it('should load strings from available strings', () => {
    expect(strings('LOADING')).to.equal(_strings.LOADING);
  });

  it('should throw error if string is not present', () => {
    expect(() => { strings('does-not-exist'); }).to.throw(Error, /Could not find string for key:/);
  });
});
