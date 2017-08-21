Array.prototype.mergeSort = function (comparator = function (x,y) {
  if (x === y) {
    return 0;
  } else if (x > y) {
    return 1;
  } else {
    return -1;
  }
}) {
  if (this.length <= 1) {
    return this;
  }
  let mid = Math.floor(this.length / 2);
  let left = this.slice(0, mid);
  let right = this.slice(mid);
  let sLeft = left.mergeSort(comparator);
  let sRight = right.mergeSort(comparator);
  return merge(sLeft, sRight, comparator);
};

function merge(left, right, comparator) {
  let result = [];
  while (left.length !== 0 && right.length !== 0) {
    if (comparator(left[0], right[0]) === -1) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  return result.concat(left).concat(right);
}
