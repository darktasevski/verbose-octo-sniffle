# Chapter 3 Functions

### Functions are used to:
* Structure programs using smaller pieces
* Reduce repetition
* Isolate subprograms from eachother
* Create new *vocabulary* to use in the programs


Subprogram is another name for subroutine


> **Subroutine:** a set of instructions designed to perform a frequently used operation within a program.

## Defining a Function

> A function definition is just a regular variable definition where the value given to the variable happens to be a function. 

```javascript
//Function definition example
var double = function(x) {
    return x * 2;
};

console.log(double(10));
//->20
```

* A function is created by the keywork *function*
* Functions can take variables in the form of *arguments*, but is not required
* Functions have a body ({}) with statements to be executed when the function is called

### Return
* When control comes across a *return* keyword, it immediately jumps out of the function and gives the returned value to the code that called it.
* If there isn't an expression after a *return* keyword, then the return value is *undefined*

---

## Parameters and Scopes

* *Parameter* is another name for *argument*
* A parameter is just a regular variable that is given by the code that called the function
* All parameters and variables created in a function are *local* to that function. This means that these variables aren't accessable to code outside the function.
* Variables created inside a function are newly created everytime that function is called.


* Variables created outside a function are called *global* because anything can access them
> By treating function-local variables as existing only within the function, the language makes it possible to read and understand functions as small universes, without having to worry about all the code at once.

---

## Nested Scope

> JavaScript distinguishes not just between global and local variables. Functions can be created inside other functions, producing several degrees of locality.

* Nested scope is the visibility of variables inside a function. Each local scope (the scope with-in a function) can see all of the local scopes that contain it.
* This approach to variable visibility is called *lexical* scoping.
* JavaScript function are the only thing that creates a new scope. Block scope, which is available in other languages, is not in JavaScript.

---

## Functions as Values

> Function variables usually simply act as names for a specific piece of the program. Such a variable is defined once and never changed. This makes it easy to start confusing the function and its name.

I'm not sure if I completely understand this statement. I think what it's saying is that a function value ( function(){code} ) isn't married to the variable name. The variable is just a regular variable that can be reassigned. A function value can do all the things that regular values can do:

* Used in arbitrary expressions, not just call it.
* Store the function value in a new place.
* Pass it as an argument
* etc

---

## Declaration Notation

* Functions can be created in another way called a *function declaration*

```javascript
//Function declaration example
function logName(x) {
    console.log(name);
}
```

* This statement defines a variable called logName and points it to the function
* One difference between a *function declaration* and a *function definition* is that a *function declaration* doesn't follow the normal top to bottom control flow.
* *function declarations* are conceptually moved to the top of their scope and can be used by all the code inside that scope.
* This can be useful when you want to order your code in a way where you don't have to worry about defining functions before they're used.

---

## The Call Stack

* As functions are called, the computer has to remember the context from where the it was called so it knows where to return when the function is finished. This context is put in a place called the *call stack*
* When a function is called, it's context is put onto the top of the call stack. When the function returns (finishes executing), it's context is removed from the top of the stack.
* The *call stack* requires space in the computers memory

---

## Optional Arguements

* JavaScript doesn't care how many or how little arguments you pass into a function
* Arguments beyond the amount that the function accepts will just be ignored
* Arguments that aren't pass in will get assigned the value of *undefined*
* This behavior can be used to make functions with optional arguments, with different behaviors depending on what is passed in

---

## Closure

> ...being able to reference a specific instance of local variables in an enclosing function—is called closure.

* From what I understand, a closure is used to save a local environment for later use

```javascript
//Example of closure

var addX = function(x) {
    //This is the closure. It saves the local environment, which in this case is the variable x.
    return function(y) {
        return x + y;
    }
}

var addTen = addX(10);
console.log(addTen(100));

//-> 110
```

---

## Recursion

* A function that calls itself is called recursive

```javascript
function power(base, exponent) {
    if (exponent == 0) {
        return 1;
    } else {
        return base * power(base, exponent -1);
    }
}

console.log(power(2,3));

//-> 8
```

* Recursion can often be slower than looping. I suspect this is because the call stack is lighter because of multiple function calls.
* Recursion is useful to create branches to solve a problem

```javascript
//Find a target number by either adding 5 or multilying by 3
function findTarget(target) {
    function find(number, history) {
        if(number == target) {
            return history;
        } else if(number > target) {
            return null;
        } else {
          return find(number + 5, history + '+ 5 ') || find(number * 3, history + '* 3 '); 
        }
    }
    return find(1, '1 ');
}
  
console.log(findTarget(23));
```
---

## Growing Functions

There are usually two ways for functions to be added to a program.

* Abstracting similar code that has been written into a new function.
* Coming across something that you feel deserves it's own function and defining it first.

* Look for oppertunities to abstract common code into functions that makes it easier to understand.

---

## Functions and Side Effects

> Functions can be roughly divided into those that are called for their side effects and those that are called for their return value. (Though it is definitely also possible to have both side effects and return a value.)

### Pure Functions
* A pure function is one that doesn't have side effects or rely on side effects of other code.
* For example, side effects of other code could be relying on global variables that other code modifies.
* Pure functions make testing easier since they always produce the same results no matter the context they're in.

---

## Exercise Answers

### Problem 1

```javascript
function min (x, y) {
  if (x < y) {
    return x;
  } else if (y < x) {
    return y; 
  } else {
    return 'They\'re the same number.'; 
  }
}
```

### Problem 2

```javascript
function isEven(num) {
  if (num < 0) {
   return isEven(num * num); 
  }
  if (num == 0) {
    return true; 
  } else if (num == 1) {
    return false; 
  } else {
     return isEven(num - 2);
  }
}
```

### Problem 3
```javascript
function countBs(word) {
  var result = 0;
  for (var i = 0; i < word.length; i++) {
    if (word.charAt(i) == 'B') {
      result++;
    }
  }
  return result;
}

function countChar(word, char) {
  var result = 0;
  for (var i = 0; i < word.length; i++) {
     if (word.charAt(i) == char) {
       result++; 
     }
  }
  return result;
}

var countBs = function(string) {
  return countChar(string, 'B');
}
```

