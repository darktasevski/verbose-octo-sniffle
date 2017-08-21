Array.prototype.bubbleSort = function (comparator = function (x,y) {
  if (x === y) {
    return 0;
  } else if (x > y) {
    return 1;
  } else {
    return -1;
  }
}) {
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < this.length; i++) {
      let j = i + 1;
      if (comparator(this[i], this[j]) === 1) {
        let tempVar = this[i];
        this[i] = this[j];
        this[j] = tempVar;
        sorted = false;
      }
    }
  }
  return this;
};
