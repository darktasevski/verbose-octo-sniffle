// Big ) Notation refers to as analying the time complexity of the algorithms as well as the space compexity (the amount of memory our algo uses to run).

// O(1) -- constant time
// regardless of input size the runtime will be the same
function add(n1, n2, n3) {
  return n1 + n2 + n3;
}

function logMulitples(num) {
  for (var i = 0; i < 10; i++ ) {
    console.log(i * num);
  }
}

// O(log(n))
// basically you can split the choices in half by picking one direction or another.
// the classis is the one person thinks of a number between 1 and 100. the other person can reduce greatly the number of picks by simply picking the halfway point between the numbers and finding out if the chosen number is higher or lower.
// ie Divide and Conquer



// O(n) -- linear time becasue the data set it iterated over approximately one time
function sayHello(numOfTimes) {
  for (var i = 0; i < numOfTimes; i++) {
    console.log('Hello!');
  }
}
// runtime of the function should be roughly proportional to the szie of the numOfTimes. ex. it takes 10 times as long to log Hello! 1000 times as it does to log Hello! 100 times.

// O(n^2)
// rule of thumb: more for loops, more times
// each for loop means another factor calculating the time and space to run the algo. ie 1 for loop means the algo is 0(n). 2 for loops is O(n^2). 3 nested loops is O(n^3) etc.
// O(n^2) means with each loop the algo is reaching each item in the array over and over again.

// O(n^n) this is crazy


// Determine the time and space complexities for the follwing functions

// 1.

function logUpTo(n) {
    for (var i = 1; i <= n; i++) {
        console.log(i);
    }
}

// This is O(1)

// 2.

function logAtMost10(n) {
    for (var i = 1; i <= Math.min(n, 10); i++) {
        console.log(i);
    }
}

// This is O(1)

// 3.

function logAtLeast10(n) {
    for (var i = 1; i <= Math.max(n, 10); i++) {
        console.log(i);
    }
}

// This is O(1)

// 4.

function onlyElementsAtEvenIndex(array) {
    var newArray = Array(Math.ceil(array.length / 2));
    for (var i = 0; i < array.length; i++) {
        if (i % 2 === 0) {
            newArray[i / 2] = array[i];
        }
    }
    return newArray;
}

// 5.

function subtotals(array) {
    var subtotalArray = Array(array.length);
    for (var i = 0; i < array.length; i++) {
        var subtotal = 0;
        for (var j = 0; j <= i; j++) {
            subtotal += array[j];
        }
        subtotalArray[i] = subtotal;
    }
    return subtotalArray;
}
