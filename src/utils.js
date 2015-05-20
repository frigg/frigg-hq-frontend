
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
