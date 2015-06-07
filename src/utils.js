import {OrderedMap, Map} from 'immutable';

export function sortByAttributeComparator(attribute) {
  var factor = 1;
  if (attribute.substr(0, 1) === '-') {
    attribute = attribute.substr(1, attribute.length - 1);
    factor = -1;
  }

  return function sortByAttributeComparator(a, b) {
    if (!a.has(attribute) || !a.has(attribute)) {
      throw new Error('Unknown attribute: ', attribute);
    }

    if (a.get(attribute) < b.get(attribute)) return -1 * factor;
    if (b.get(attribute) < a.get(attribute)) return 1 * factor;
    return 0;
  };
}

export class Storage {
  constructor(ttl) {
    this.storage = OrderedMap();
    this.ttl = ttl || 1000 * 60 * 15;
  }

  getItem(key) {
    return this.storage.get(key);
    if (window.localStorage) {
      try {
        if (!window.localStorage.getItem(key)) return undefined;
        var item = JSON.parse(window.localStorage.getItem(key));
        if (Date.now() - item.timestamp < this.ttl) {
          return item.value;
        }
      } catch (e) {
        console.log(e);
      }
    }

    return this.storage[key];
  }

  setItem(key, value) {
    this.storage = this.storage.set(key, value);
    return;
    if (window.localStorage) {
      try {
        return window.localStorage.setItem(key, JSON.stringify({
          value: value,
          timestamp: Date.now()
        }));
      } catch (e) {
        console.log(e);
      }
    }

    this.storage[key] = value;
  }
}
