//input is a string, with numbers, 4 basic math operators, and parans
//evaulate and return a number
//******cannot use eval();


/****************** need to take care of NaN cases  ****************************/
const evaluateString = (input) => {
  let numbersStack = [];     //stack
  let operatorsStack = [];   //stack
  let operators = ['(', '+', '-', '*', '/'];

  //need to sanitize input for spaces

  for (var i = 0; i < input.length; i++) {
    let lowerPriority = checkPriority(input[i]) < checkPriority(operatorsStack[operatorsStack.length - 1]);

    if (lowerPriority) {
      doMath(numbersStack, operatorsStack);
      operatorsStack.push(input[i]);
   } else if (operators.includes(input[i])) {
      operatorsStack.push(input[i]);
    } else if (input[i] === ')') {
      //pop 2 off numbers, 1 off operators
      doMath(numbersStack, operatorsStack);
      operatorsStack.pop();
    } else {
      numbersStack.push(input[i]);
    }
  }

  while (numbersStack.length !== 1) {
    doMath(numbersStack, operatorsStack);
  }
  return numbersStack[0];
}

const doMath = (numStack, opStack) => {
  // console.log('number stack', numStack)
  // console.log('operator stack', opStack)
  
  let number2 = parseInt(numStack.pop());
  let number1 = parseInt(numStack.pop());
  let operator = opStack.pop();
  
  // console.log(' number2',  number2)
  // console.log(' number1',  number1)
  // console.log(' operator', operator)

  //check priority of the operator

  if (operator === '+') {
    numStack.push(number1 + number2);
  }
  if (operator === '-') {
    numStack.push(number1 - number2);
  }
  if (operator === '*') {
    numStack.push(number2 * number1);
  }
  if (operator === '/') {
    numStack.push(number1 / number2);
  }
  return;
}

const checkPriority = (operator) => {
  let priority = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "^": 3,
    "(": 4,
  }
  return priority[operator];
}
// console.log(checkPriority('/'))
// console.log(checkPriority('+'))

console.log(evaluateString('((1+2)+3)+4'))    //10
console.log(evaluateString('((2-1)+5)/6'))    //1
console.log(evaluateString('6/2+1'))      //4

//using a new function
function evil(fn) {
  return new Function('return ' + fn)();
}

// console.log( evil('6/2+1') ); // => 40.4