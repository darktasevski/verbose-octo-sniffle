// http://eloquentjavascript.net/03_functions.html#c_YeYw47ylC5

var power = function(base, exponent) {
    var result = 1;
    for (var count = 0; count < exponent; count++)
      result *= base;
    return result;
};

console.log(power(2, 10)); // <-- 1024

// prompt the user for a base and an exponent
// return the result of the base to the power of the exponent

// nodejs process to get user input
//per: https://stackoverflow.com/a/32276364/5225057
// function prompt(question, callback) {
//   var stdin  = process.stdin,
//       stdout = process.stdout;
//
//   stdin.resume();
//   stdout.write(question);
//
//   stdin.once('data', function(data) {
//     callback(data.toString().trim());
//   });
// };

// Use case
// prompt('What\'s your name? ', function (input) {
//   console.log("Your name is " + input);
//   process.exit();
// })

// Not sure I understand what's going on here
// but I think it has something to do with asynchronous code execution
// that said, I am trying to prompt the user for two inputs
// and then use those two inputs as the base and exponent
// var firstInput = prompt('What\'s your first name? ', function (input) {
//   console.log("Your name is " + input);
//   process.exit();
//   return input;
// })
//
// var lastInput = prompt('What\'s your last name? ', function (input) {
//   console.log("Your name is " + input);
//   process.exit();
//   return input;
// })

// console.log(firstInput);

// vvv NOPE vvv
// var twoAsynchronousInputs = prompt('What\'s your first name? ',
//   function (firstInput) {
//     console.log("Your first name is " + firstInput);
//     process.exit();
//   }, prompt('What\'s your last name? ', function (secondInput) {
//     console.log("Your last name is " + secondInput);
//     process.exit();
//   return [firstInput, secondInput];
// }));
//
// // console.log(twoAsynchronousInputs);

// A later chapter covering asynchronicity: http://eloquentjavascript.net/20_node.html#h_HH3wvnWMnd
// possible solution? http://www.splinter.com.au/reading-a-line-from-the-console-in-nodejs/
