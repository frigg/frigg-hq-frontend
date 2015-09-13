import {OrderedMap} from 'immutable';

export function sortByAttributeComparator(attribute) {
  let factor = 1;
  if (attribute.substr(0, 1) === '-') {
    attribute = attribute.substr(1, attribute.length - 1);
    factor = -1;
  }

  return function sort(a, b) {
    if (!a.has(attribute) || !b.has(attribute)) {
      throw new Error('Unknown attribute: ', attribute);
    }

    if (a.get(attribute) < b.get(attribute)) return -1 * factor;
    if (b.get(attribute) < a.get(attribute)) return 1 * factor;
    return 0;
  };
}

/* eslint-disable no-unreachable */
export class Storage {
  constructor(ttl) {
    this.storage = OrderedMap();
    this.ttl = ttl || 1000 * 60 * 15;
  }

  getItem(key) {
    return this.storage.get(key);
  }

  setItem(key, value) {
    this.storage = this.storage.set(key, value);
    return;
  }
}

export const isInTest = typeof global.it === 'function';
