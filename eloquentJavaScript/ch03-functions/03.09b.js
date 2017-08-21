// http://eloquentjavascript.net/03_functions.html#p_KNlnW1VpW2

function findSolution(target) {
  function find(start, history) {
    if (start == target)
      return history;
    else if (start > target)
      return null;
    else
      return find(start + 5, "(" + history + " + 5)") ||
             find(start * 3, "(" + history + " * 3)");
  }
  return find(1, "1");
}

console.log(findSolution(24)); // <--- (((1 * 3) + 5) * 3)
console.log(findSolution(13)); // <--- (((1 * 3) + 5) + 5)
console.log(findSolution(83));
console.log(findSolution(3890));
