What is recursion?
==================

* Recursion is a function that calls itself until it does not.

* often recursion is used instead of iteration

* recursive function calls must have a base case
  * base case is a specific condition to return a value instead of calling itself again

* note: function calls are stored on the call stack
  * stacks are LIFO(last in, first out)
  * function calls are popped off the stack whe that function returns a value
  * js does not yet fully support proper tail call optimization
    * js runs the risk of overflowing the call stack when dealing with large data sets

* the call stack then pushes each of the the recursive function calls
* then the recursive functions are completed until it reaches the base case, and empties the stack as it goes thru it

* best play with Chrome DevTools and set the breakpoints to observe the call stack in action!
