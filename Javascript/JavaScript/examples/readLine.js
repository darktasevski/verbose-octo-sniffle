const readline = require('readline');

const reader = readline.createInterface({

  input: process.stdin,
  output: process.stdout
});

reader.question("which choice??", function (choice) {
  console.log(`You chose: ${choice}!`);
  return choice;
});
