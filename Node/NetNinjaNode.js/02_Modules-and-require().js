/*

Modules and require()

https://www.youtube.com/watch?v=xHLd36QoS4k

We can use modules to split our code up into re-usable, logical sections.

module - just another JavaScript file

Example:

In count.js:
*/
var counter = function(arr) {
	return 'There are ' + arr.length + ' elements in this array.';
};

module.exports = counter;
// makes the "counter" function available outside of this module

console.log(counter(['shaun', 'crystal', 'ryu']));
// There are 3 elements in this array.

// In app.js:
var counter = require('./count');

console.log(counter(['shaun', 'crystal', 'ryu']));
// There are 3 elements in this array.


