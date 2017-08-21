// Objects

// Property descriptors
var myObj = {};
Object.defineProperty(myObj, "a", {
  value: 2,           // Sets value
  writable: true,     // Allows writability
  configurable: true, // Allows property configuration -- if set to false, cannot be undone!
  enumerable: true    // Allows enumberation through "for... in" loop
})

// Object mutability control
Object.preventExtensions(myObj) // Disables addition of new properties to object
Object.seal(myObj)              // Calls Object.preventExtensions(), and marks all existing property as "configurable: false"
Object.freeze(myObj)            // Calls Object.seal() and prevents all descriptor usage. Highest level of immutability "writable: false"

// Create an iterator function that generates random #s
var randoms = {
	[Symbol.iterator]: function() {
		return {
			next: function() {
				return { value: Math.random() };
			}
		};
	}
};

// Push random numbers using "for... of" loop (ES6 syntax)
// "for... of" loop iterates over values, NOT indices
var randoms_pool = [];
for (var n of randoms) {
	randoms_pool.push( n );

	// don't proceed unbounded!
	if (randoms_pool.length === 100) break;
}