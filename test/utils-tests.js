/* eslint-env mocha */
import {expect} from 'chai';

import {sortByAttributeComparator} from '../src/utils';

describe('sortByAttributeComparator(attr)', () => {
  const first = {value: 100};
  const second = {value: 200};

  describe('ascending', () => {
    it('should return 0 if a equals b', () => {
      expect(sortByAttributeComparator('value')(first, first)).to.equal(0);
      expect(sortByAttributeComparator('value')(second, second)).to.equal(0);
    });

    it('should return 1 if a is greater than b', () => {
      expect(sortByAttributeComparator('value')(second, first)).to.equal(1);
    });

    it('should return -1 if a is less than b', () => {
      expect(sortByAttributeComparator('value')(first, second)).to.equal(-1);
    });
  });

  describe('descending', () => {
    it('should return 0 if a equals b', () => {
      expect(sortByAttributeComparator('-value')(first, first)).to.equal(0);
      expect(sortByAttributeComparator('-value')(second, second)).to.equal(0);
    });

    it('should return -1 if a is greater than b', () => {
      expect(sortByAttributeComparator('-value')(second, first)).to.equal(-1);
    });

    it('should return 1 if a is less than b', () => {
      expect(sortByAttributeComparator('-value')(first, second)).to.equal(1);
    });
  });
});
