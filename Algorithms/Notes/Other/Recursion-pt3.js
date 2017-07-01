// Recursion

// Recreating accounting.js formatMoney() method

function formatMoney(numbers) {
  if (Array.isArray(numbers)) {
    return numbers.map(function (element) {
      return '$' + element;
    });
  } else {
    return '$' + numbers;
  }
}

// If passed [1, [2], [3]] ==> Return: ["$1", "$2", "$3"]
// This occurs due to implicit coercion of array (aka [1]) to a string when combined with '$'
// This occurs because the engine will pull out the inner element using .toString() on array

function formatMoney(numbers) {

  // Recursive case
  if (Array.isArray(numbers)) {
    return numbers.map(function (element) {
      // Removes one layer of array, and recurses
      return formatMoney(element);
    });
  } else {
    return '$' + numbers;
  }
}

// Observations about recursion
// 1. See the structure of the recursion (look at base case and recursive case)
// 2. Recursive case needs to get closer to the base case

// Steps to recursive mastery
// 1. Look at a lot of recursive code!