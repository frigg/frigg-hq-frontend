import {expect} from 'chai';
import {Map} from 'immutable';

import {sortByAttributeComparator} from '../src/utils';

describe('sortByAttributeComparator(attr)', () => {
  var a = Map({id: 100});
  var b = Map({id: 200});

  describe('ascending', () => {
    it('should return 0 if a equals b', () => {
      expect(sortByAttributeComparator('id')(a, a)).to.equal(0);
      expect(sortByAttributeComparator('id')(b, b)).to.equal(0);
    });

    it('should return 1 if a is greater than b', () => {
      expect(sortByAttributeComparator('id')(b, a)).to.equal(1);
    });

    it('should return -1 if a is less than b', () => {
      expect(sortByAttributeComparator('id')(a, b)).to.equal(-1);
    });
  });

  describe('descending', () => {
    it('should return 0 if a equals b', () => {
      expect(sortByAttributeComparator('-id')(a, a)).to.equal(0);
      expect(sortByAttributeComparator('-id')(b, b)).to.equal(0);
    });

    it('should return -1 if a is greater than b', () => {
      expect(sortByAttributeComparator('-id')(b, a)).to.equal(-1);
    });

    it('should return 1 if a is less than b', () => {
      expect(sortByAttributeComparator('-id')(a, b)).to.equal(1);
    });
  });
});
