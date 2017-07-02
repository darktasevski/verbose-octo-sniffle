# Chapter 1. What is scope?
> “...the ability to store values and pull values out of variables is what gives a program state”

## Compiler Theory
* Compiled languages typicall go through three steps before it is executed
  * Tokenizing/Lexing
  * Parsing
  * Code-Generation

### Tokenizing/Lexing
* Breaking up the characters into meaningful (to the language) chunks called *tokens*

```javascript
//Example of tokenizing
a = 2

//var, a, =, 2
```

### Parsing
* Taking an array of tokens and turning it into a tree of nested elements which represent the grammatical structure of the program.
* This tree is called an "AST" (Abstract Syntax Tree)

### Code-Generation
* Taking an AST and turning it into executable code (machine instructions)


* JavaScripts compiler doesn't have a lot of time to optimize like other languages which are pre-compiled

---

## Understanding Scope

### The Cast
* Engine
  * Start-to-finish compilation and execution of the program
* Compiler
  * *Friend of the engine*: Handles the parsing and code-generation
* Scope
  * *Friend of the engine*: “collects and maintains a look-up list of all the declared identifiers (variables), and enforces a strict set of rules as to how these are accessible to currently executing code.”

* For variable assignments, the compiler always asks the *scope* if the variable has been declared, and then when the engine executes the code, the engine will look the variable up in the *scope*.

Assignment Operations:
* LHS: Left Hand Side
  * When a variable appears on the left side of the operation
  * What this actually means is when a variable is looked up so it can be assigned a value
* RHS: Right Hand Side
  * When a variable appears on the right side of the operation
  * What this actually means is when a variable is being looked up so its value can be retrieved

```javascript
//Example of LHS and RHS

//LHS
//Who is the target?
var a = 2;

//RHS
//What is the source?
console.log(a);
```

---

## Quiz

```javascript
function foo(a) {
    var b = a;
    return a + b;
}

var c = foo( 2 );
```

1. LHS look-ups
  * var c
  * a = 2
  * b = a
2. HRS look-ups
  * foo(2)
  * a
  * a
  * b

---

## Nested Scope
* Scopes are nested other scopes
* The Engine will first ask the current scope and then work its way outside until it finds a reference
* The global scope is the outermost scope and the search will stop whether if finds the variable or not

---

## Errors
* If an RHS lookup fails to find a variable, it will result in an error called *ReferenceError*
* If an LHS lookup fails, and the program is not running in "Strict Mode", the global scope will create the variable and hand it back to the engine
* If you try to do something with an RHS look-up value that is impossible, the engine will throw an error called *TypeError*

