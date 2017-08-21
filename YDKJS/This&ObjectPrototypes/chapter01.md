# Chapter 1. this or That?

* *this* is one of the most confused mechanisms in JavaScript
* *this* is defined in the scope of every function

## Why this?
> The more complex your usage pattern is, the more clearly you’ll see that passing context around as an explicit parameter is often messier than passing around a this context.

## Confusions
* *this* creates confusion when developers try to think about it too literally
* It's common to think that *this* refers to the function itself
* Another common thing to think is that *this* refers to the function's scope
  * *this* does not in any way refer to the functions scope

### Its Scope
* You can't use *this* to look something up in a lexical scope

## What's this?
* *this* is not an author-time binding. It's a run-time binding.
* *this* is contextual based
* What *this* references is based on entirely on the call-site from where the function is called
