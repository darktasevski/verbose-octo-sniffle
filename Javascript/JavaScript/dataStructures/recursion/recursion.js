let factorial = (num) => {
  var nextNum = num - 1;
  if (num === 1) return num;
  if (num < 0) return null;
  return num * factorial(nextNum);
};

// note: this is not the best way to perform a factorial function. If you make num 0 it makes a mess out of the entire thing

// recursion
// when a function calls itself until it doesn't

let countDownFrom = (num) => {
  if (num === 0) return;
    console.log(num);
    countDownFrom(num - 1);
};

countDownFrom(10);

let categories = [
  { id: 'animals', 'parent': null },
  { id: 'mammals', 'parent': 'animals' },
  { id: 'cats', 'parent': 'mammals' },
  { id: 'dogs', 'parent': 'mammals' },
  { id: 'chihuahua', 'parent': 'dogs' },
  { id: 'labrador', 'parent': 'dogs' },
  { id: 'persian', 'parent': 'cats' },
  { id: 'siamese', 'parent': 'cats' },
];

let makeTree = (categories, parent) => {
  let node = {};
  categories
    .filter(c => c.parent === parent )
    .forEach( c => node[c.id] =
      makeTree(categories, c.id) );
    return node;
};

console.log(JSON.stringify(makeTree(categories, null), null, 2));


// bog standard way
let reverse = (str) => {
  return str.split('').reverse().join('');
};

reverse('cowbell');

// more enlightened method

let reverse2 = (str) => {
  let revW = [];
  let word = str.split('');
  while (revW.length < str.length) {
    revW.push(word.pop());
  }
  return revW.join('');
};

reverse2('cats');

// recursion style reverse
let recursionRev = (str) => {
  let revW = [];
  str = str.split('');
  function reverseIt(str) {
    if (str.length !== 0) {
      revW.push(str.pop());
      reverseIt(str);
    }
  }
  reverseIt(str);
  return revW.join('');
};

recursionRev('lemon');
