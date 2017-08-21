// taking a letter and first pushing each letter into the letter stack
// then taking a letter and popping it off the word and adding to rword.
// compare word and rword if they are the same
function palindrome(word) {
  var letters = [];
  var rword = '';
  // put letters into stack
  for (let i = 0; i < word.length; i++) {
    letters.push(word[i]);
  }
  //pop off the stack in reverse order
  for (let i = 0; i < word.length; i++) {
    rword += letters.pop();
  }

  if (rword === word) {
    return (word + ' is a palindrome of ' + rword);
  } else {
    return (word + ' is not a palindrom of ' + rword);
  }
}

palindrome('bechemel');

// stack useful when we add data sequentially. Can only remove most recent data.

// a more classic way of showing the stack:

// creates a stack
var Stack = function() {
  this.count = 0;
  this.storage = {};

  // Adds a value onto the end of the Stack
  this.push = function(value) {
    this.storage[this.count] = value;
    this.count++;
  };

  // removes and returns the value at the end of the Stack
  this.pop = function() {
    if (this.count === 0) {
      return undefined;
    }

    this.count--;
    var result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
  };

  this.size = function() {
    return this.count;
  };


  // returns the value at the end of the Stack
  this.peek = function() {
    return this.storage[this.count - 1];
  };

  // shows you everything inside storage
  this.show = function() {
    return this.storage;
  };

};

var cats = new Stack();

cats.push('Fluffy');
console.log(cats.peek());
cats.push('Raul');
cats.push('Ludovic');
cats.push('Charmain');

console.log(cats.size());
console.log(cats.show());
