/* eslint-env mocha */
import _ from 'lodash';
import {expect} from 'chai';

import * as Actions from '../src/constants';

describe('Actions', () => {
  it('should contain the key as a string', () => {
    _.forOwn(Actions, (value, key) => {
      expect(key).to.equal(value);
    });
  });
});
