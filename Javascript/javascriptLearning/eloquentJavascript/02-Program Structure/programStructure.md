# Chapter 2 Program Structure

## Expressions and Statements
> A fragment of code that produces a value is called an expression.
```javascript
4
2 + 2
typeof 2
var three
```

> If an expression corresponds to a sentence fragment, a JavaScript statement corresponds to a full sentence in a human language. A program is simply a list of statements.
```javascript
1;
!false;
```

* Side effects are code that effects the internal state of a program or changes something on the screen.
---

## Variables
* Variables hold onto values
```javascript
var one = 1
var two = 'two'
var truth = true
```

* After a variable has been created, it's name can be used as an expression
```javascript
var ten = 10;

console.log(ten * ten)
```

> You should imagine variables as tentacles, rather than boxes. They do not contain values; they grasp them.
* Variables that aren't assigned a value return as *undefined*
* var can define multiple variables with commas
```javascript
var one = 1, two = 2, three = 3
```

* Keywords are words that are reserved in the JavaScript language and  can't be used as variables

---

## The Environment
> The collection of variables and their values that exist at a given time is called the environment.

* The environment is never empty, even at startup. There are variables created as part of the language, and when running insde a browser, there are variables and functions to interact with.
* I'm guessing that some examples of these are *Math, Window, and Alert*.

---

## Functions
> Executing a function is called invoking, calling, or applying it.

```javascript 
//This is a function call
alert('Hello');
```

* Values between the parentheses in a function call are called *Arguments*.
* Arguments are used to pass values into the function

---

## Return Values
> When a function produces a value, it is said to return that value.

* A function that returns a value can be used in other expressions.
```javascript
console.log(Math.min(2, 4) + 100);
//Math.min returns 2 and is added to 100
//->102
```

---

## Prompt and Confirm
* Browsers contain other functions similar to alert, but for user input.
* These functions are called Prompt and Confirm.

* Confirm gives the user a two buttons to either confirm or cancel. This returns either *true* or *false*.
```javascript
//Example of Confirm
confirm('Give me all your money?')
```

* Prompt lets the user type anything into an input box. If confirm is hit, the returned value will be a *string* of whatever the user typed in. If the user cancels, the returned value will be *null*.

```javascript
//Example of Prompt
var question = prompt('Give me all your money?');

console.log(question);
```

---

## Control Flow
> When your program contains more than one statement, the statements are executed, predictably, from top to bottom.

* This is called synchronus. The next statement cannot run until the previous has finished.

### Type Conversion
* There are functions that will take a value and attempt to convert it to a different value.
* Examples of these functions are *Number*, *String*, and *Boolean*

---

## Conditional Execution
>Executing statements in straight-line order isn’t the only option we have. An alternative is conditional execution, where we choose between two different routes based on a Boolean value.

* Conditionals are used when you want to run a piece of code only when something is *true* or *false*
* Conditionals are written with the *if* keyword in JavaScript

```javascript
//Example of if statement
//isNaN returns true if the argument provided is not a number
//a ! flips an expressions boolean value from true to false and vice-verse
var theNumber = Number(Prompt('Type a number'));
if(!isNaN(theNumber)) {
    alert('The number you typed was ' + String(theNumber));
}
```

* The *else* keyword is used to execute code if the expression in the *for* statement is false
```javascript
//Example of else statement

var theNumber = Number(Prompt('Type a number'));
if(!isNaN(theNumber)) {
    alert('The number you typed was ' + String(theNumber));
} else {
    alert('You didn\'t type a number, dummy');
}
```

* Multiple conditions can be chained together with *else if*

```javascript
//Example of else if statement

var theNumber = (Number(prompt('Enter a number')));

if(isNaN(theNumber)) {
    alert('You didn\'t type a number, dummy');
} else if (theNumber >= 10)  {
    alert('You picked a number greater than or equal to 10')
} else {
    alert('You picked a number less than 10');
}
```

---

## While and Do Loops

* A loop is used for repeating chunks of code
* Much like the *if* statement, code will be executed while the expression between the parentheses is *True*
* A sequences of statements wrapped in {} is called a *block*
* You don't need {} for single statements, but it's good practice to used them anyway

### While loop
* A while loop will continue executing until it's expression is false.

```javascript
//Example of a while loop

var theNumber = 0;
while (theNumber <= 10) {
    console.log(theNumber);
    theNumber += 1;
}
```

### Do While Loop
* A *do while* loop will execute it's code block once, and then evaluate it's expression after.

```javascript
//Example of do while loop

do {
    console.log('hello');
} while(false);
```

---

## For Loops

* A *for* loop is used to cover the common pattern of using a counting variable when using a while loop.
* In a *for* loop, you create a variable, a expression that will be evaluated, and an updater to the variable that will happen after the code block has been executed.

```javascript
//Example of a for loop

for (var i = 0; i <= 10; i++) {
    console.log(i);
}

//-> 0
//-> 1
//-> etc
```
> The parentheses after a for keyword must contain two semicolons. The part before the first semicolon initializes the loop, usually by defining a variable. The second part is the expression that checks whether the loop must continue. The final part updates the state of the loop after every iteration.

* You can actually omit any or all of the expressions between the parentheses as long as you include two semicolons

### Break
* Another way to break out of a loop is to use the *break* keyword

```javascript
//break keyword inside of a loop

for(var i = 20; ; i++) {
    if (i % 7 === 0) {
        break;
    } 
}
console.log(i);
//-> 21
```

* The *%* (modulus) operator divides two numbers and returns the remainder.

### Continue
* The *continue* keyword is like *break* except that instead of jumping out of the loop, it stops executing code and starts the next iteration of the loop

```javascript
//continue keyword example
//Logs the odd numbers between 0 and 20

for (var i = 0; i <= 20; i++) {
 if(i % 2 == 0) {
  continue; 
 }
  console.log(i);
}

//-> 1
//-> 3
//-> etc
```

---

## Updating variables succinctly

* There are some shortcuts when updating variables

```javascript
i += 2;
//-> i = i + 2

i *= 2;
//-> i = i * 2

i++;
//-> i = i + 1

i--;
//-> i = i = 1 
```

---

## Dispatching on a value with switch

* *switch* statements are similar to if statements
* The program will jump to the label that matches the value given to *switch* and execute code until it hits a *break* statement
* Labels can't contain logic, only primitives
* A *break* statement can be omitted to share code between labels

```javascript
// switch example

var question = prompt('Best Switch launch game?')
switch (question) {
    case 'Bomberman':
        console.log('You\'re wrong!');
        break;
    case 'Zelda':
        console.log('You\'re right!')
    default:
        console.log('Zelda is an awesome game.');
        break;
}

```

---

## Exercise Answers

### Problem 1:

```javascript
var hash = '';
for (var i = 0; i <=7; i++) {
  hash += '#';
  console.log(hash); 
}
```

### Problem 2:

```javascript
for (var i = 1; i <= 100; i++) {
 if(i % 3 == 0 && i % 5 == 0) {
  console.log('FizzBuzz'); 
 } else if (i % 3 == 0) {
  console.log('Fizz'); 
 } else if (i % 5 == 0) {
  console.log('Buzz'); 
 } else {
  console.log(i); 
 }
}
```

### Problem 3:

```javascript
var size = 8;
var grid = '';

for (var i = 0; i < size; i++) {
  var even, odd;
  if (i % 2 == 0) {
    even = ' ';
    odd = '#';
  } else {
    even = '#';
    odd = ' ';
  }
  for (var x = 0; x < size; x++) {
    if (x % 2 == 0) {
     grid += even; 
    } else {
     grid += odd; 
    }
  }
  grid += '\n';
}

console.log(grid);
```