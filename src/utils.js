
export function sortByAttributeComparator(attribute) {
  return function sortByAttributeComparator(a, b) {
    if (a[attribute] < b[attribute]) return -1;
    if (b[attribute] < a[attribute]) return 1;
    return 0;
  };
}
