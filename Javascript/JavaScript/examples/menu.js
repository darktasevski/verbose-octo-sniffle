// jshint esversion: 6

const readLine = require('readline');

const reader = readLine.createInterface({
  input: process.stdin,
  output: process.stdout

});


console.log("1. Add 2 numbers");
console.log("2. Subtract 2 numbers");
console.log("3. Multiply 2 numbers");
console.log("4. Divide 2 numbers");
console.log("5. QUIT");

function calculator(choice) {
reader.question("Choose an option: ", function(answer) {
    console.log(`You chose ${answer}`);
  reader.question("Pick number 1: ", function(n1) {
    reader.question("Pick number 2: ", function(n2) {

      switch (`${answer}`) {
        case "1":       //add function
          console.log("You are ADDING 2 numbers!");
          choice(parseInt(n1) + parseInt(n2));
          break;

        case "2":
          console.log("You are SUBTRACTING 2 numbers!");
          choice(parseInt(n1) - parseInt(n2));
          break;
        case "3":
          console.log("You are MULTIPLYING 2 numbers!");
          choice(parseInt(n1) * parseInt(n2));
          break;
        case "4":
          console.log("You are DIVIDING 2 numbers!");
          choice(parseInt(n1) / parseInt(n2));
          break;
        case "5":
          console.log("QUITTING");
          process.exit(0);
          
        }

      });
    });
  }
  );
}

calculator(function(result) {
  console.log(`the result is ${result}`);
  reader.close();
});
