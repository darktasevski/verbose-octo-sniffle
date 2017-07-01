// LIFO - last in, first out
// use .pop() to remove last item from array
// use .push() to add to the end of the array
// use .length to find out size/lenght of array

// Real World Examples of Stack:
// Call Stack
// Backtracking
// back button in the browser
// calculations

// stacks Exercise:

function Stack() {
  var collection = [];

  this.push = function(val) {
    return collection.push(val);
  };

  this.pop = function() {
    return collection.pop();
  };

  this.peek = function() {
    return collection[0];
  };

  this.print = function() {
    console.log(collection);
  };
}

var cats = new Stack();
cats.push('Fluffy');
cats.print();
cats.push('Lula');
cats.push('Hector');
cats.peek();
cats.push('Arvin');
cats.print();
