const BINARY_SEARCH = (array, target) => {
  if (array.length === 0) { return null; }
  let mid = Math.floor(array.length / 2);
  if (target < array[mid]) {
    return BINARY_SEARCH(array.slice(0, mid), target);
  } else if (target === array[mid]) {
    return mid;
  } else {
    let right = BINARY_SEARCH(array.slice(mid + 1), target);
    if (right === null) {
      return null;
    } else {
      return right + mid + 1;
    }
  }
};
