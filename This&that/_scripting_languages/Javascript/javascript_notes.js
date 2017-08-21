- you need semicolons for expressions,
- you dont need semicolons for if statements and function declaration

- var x is in the global scope, if it were declared inside a function, it would create a new variable



- a closure is a function that:
    - returns a function that has access to the parent scope

- a closure is a function factory, that can package variables to it!


- hoisting:
    javascript hoistes variables (and assignes 'undefined' to them temporarily) and functions to the top (but not function expressions, they stay where they are) --- only the variable of the function expression is hoisted to the top, and temporarily assigned to 'undefined'
    then it deals with expressions
    so you can use your functions on top and declare them in the bottom
    - so dont call a function expression before its declared
        - so function expressions should be close to the top!
    - but you can call a normal function before its declaration!

for(key in myObject){ console.log(key)} // object fields loop




--- prototype
  - its the object's parent
  - prototype is a blue-print object
  - prototypes offer their methods to your object
  - there is : object prototype, and all these inherit from object prototype:
                array prototype, string prototype, number prototype, function prototype

- you can add functions to a prototype:
    String.protptype.foo = function(){} // now all strings will have a 'foo' function

- `this` referes to the caller of the function that uses `this`


- you can make your object become a PROTOTYPE! (the child object will inherit all fields and values)
    var foo = Object.create(myObject)

-   x.isPrototypeOf(y) // it looks up the prototype chain, it checks if its an ancestor


- a contructor function is NOT a prototype, but we can assign a prototype to a constructor function!
    TheConstructorFunctionName.prototype = someObject // then all instances will have access to `someObject`'s fields and values
        - you can also use `this` to reference the instance!

    - so its better to declare functions in the prototype!
- x.constructor // returns the constructor function as a string
- x.constructor.protptype // returns the prototype object associated with the constructor
- x.__proto__ // same as x.constructor.protptype

- constructors can be function expressions too!

- Variables created without the keyword var, are always global, even if they are created inside a function.



-> 4 == "4" // true
-> 4 === "4" // false


//----------------------------------------------------------------------------------------------------

// modules
var FOO = (function(){
  var password = 123456

  function greeting(){
    console.log('hello, password is: ' + password)
  }

  return {
    greeting: greeting
  }  
})();


FOO.greetings(); // hello, password is: 123456

FOO.password // undefined
