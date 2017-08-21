/**
 * Chapter 3: Basic Strings and Quasi-Literals
**/

// Quasi-literal strings, aka 'template strings':
`A popular number for nerds is ${40 + 2}`
// 'A popular number for nerds is 42'

// Evaluated late, when that line or lines of code is evaluated
const name = 'Harry';
const greeting = (name) => `Hello my name is ${name}`;

greeting('Aos'); // 'Hello my name is Aos'