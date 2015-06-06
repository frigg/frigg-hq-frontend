
export function sortByAttributeComparator(attribute) {
  var factor = 1;
  if (attribute.substr(0, 1) === '-') {
    attribute = attribute.substr(1, attribute.length - 1);
    factor = -1;
  }

  return function sortByAttributeComparator(a, b) {
    if (!a.hasOwnProperty(attribute) || !a.hasOwnProperty(attribute)) {
      throw new Error('Unknown attribute: ', attribute);
    }

    if (a[attribute] < b[attribute]) return -1 * factor;
    if (b[attribute] < a[attribute]) return 1 * factor;
    return 0;
  };
}

export class Storage {
  constructor(ttl) {
    this.storage = {};
    this.ttl = ttl || 1000 * 60 * 15;
  }

  getItem(key) {
    return this.storage[key];
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
    return this.storage[key] = value;
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
