//given sorted list, return special index (if value at index is the same as index)

const specialIndex = (array, start, end) => {
  start = start || 0;
  end = end || array.length - 1;
  
  var middle= Math.floor((end + start) / 2 );

  if (middle === end) {
    return -1;
  }

  //binary search
  if (array[middle] === middle) {
    // result = middle;
    return array[middle];
  } else if (array[middle] < middle && array.length > 1) {
    //search right side
    specialIndex(array, middle, end);
  } else if (array[middle] > middle && array.length > 1) {
    //search left side
    specialIndex(array, start, middle);
  }

  // return result === null ? -1 : result;
  //no special index
}

console.log(specialIndex( [-22,-11,0,3,7] ))  //3 