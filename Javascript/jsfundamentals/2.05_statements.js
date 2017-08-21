/*
Statements

Syntax:
var name = expression;

A compilation unit contains a set of executable statements. In web browsers, each
<script> tag delivers a compilation unit that is compiled and immediately executed.
Lacking a linker, JavaScript throws them all together in a common global
namespace (global scope).

When used INSIDE of a function, the var statement defines the function’s PRIVATE
variables (local scope).

The switch, while, for, and do statements are allowed to have an optional label 
prefix that interacts with the break statement.

Statements tend to be executed in order from top to bottom. 

The sequence of execution can be altered by the conditional statements 
(if and switch), by the looping statements (while, for, and do), 
by the disruptive statements (break, return, and throw), and by function 
invocation.

A block is a set of statements wrapped in curly braces. 
Blocks in JavaScript do not create a new scope, so variables should be defined 
at the TOP of the function, not in blocks.

The if statement changes the flow of the program based on the value of the expression.
The then block is executed if the expression is truthy; otherwise, the optional
else branch is taken.
*/

/*
Here are the falsy values:
false
null
undefinted
The empty string ''
The number 0
The number NaN

All other values are truthy, including true, the string 'false', and all objects.
*/

/* 
Determine if a property name is truly a member of the object
or was found instead on the prototype chain:

for (myvar in obj) {
	if (obj.hasOwnProperty(myvar)) {
 		...
	}
}
*/

/*
do statement (always executes at least once):
do {
	block 
}
	while (expression);
*/

/*
return statement:
Causes the early return from a function. 
Can also specify the value to be returned.

Syntax:
return expression;
*/

/*
break statement:
Causes the exit from a loop statement or a switch statemenet.
*/

/*
Operator Precedence:

. [] ( ) 	Refinement and invocation
delete new typeof + - ! 	Unary operators
* / % 	Multiplication, division, modulo
+ - 	Addition/concatenation, subtraction
>= <= > < 	Inequality
=== !== 	Equality
&& 	Logical and
|| 	Logical or
?: 	Ternary

*/




console.log(2+2);
console.log("string");









