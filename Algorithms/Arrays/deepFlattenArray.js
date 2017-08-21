const flatten = (array) => {
  let result = [];

  for (var i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      result = result.concat(flatten(array[i]));
    } else {
      result.push(array[i]);
    }
  }

  return result;
}

const iterativeFlatten = (array) => {
  let result = [];
  let todo = [array];

  while (todo.length) {
    var current = todo.shift();
    if (Array.isArray(current)) {
      todo.unshift.apply(todo, current);
    } else {
      result.push(current);
    }
  }
  return result;
}


const reduceFlatten = (array) => {
  return array.reduce( (accum, iterator) => {
    return accum.concat( Array.isArray(iterator) ? reduceFlatten(iterator) : iterator);
  }, []);
}


console.log(flatten([[1,2, [3,[4]]]]));
console.log(iterativeFlatten([[1,2, [3,[4]]]]));
console.log(reduceFlatten([[1,2, [3,[4]]]]));