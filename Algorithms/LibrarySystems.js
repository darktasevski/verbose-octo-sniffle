// Library system notes

// Current approach: One global variable per library
// 1. Create: Run library in IIFE, attach library to window
// 2. Use: Access library from window

// Another approach: One global variable period
// 1. Create: librarySystem('libraryName', function() {/* return library */});
// 2. Use: librarySystem('libraryName');

(function () {

	var libraryStorage = {};

	function librarySystem(libraryName, callback) {
		if (arguments.length > 1) {
			// Create a library
			libraryStorage[libraryName] = callback();
		} else {
			return libraryStorage[libraryName];
		}
	}

	window.librarySystem = librarySystem;

})();

// Example implementation of library system:
// Creating a library and adding to librarySystem

librarySystem('sandwhichLibrary', function () {

	var breads = {
		wheat: 'The healthy option',
		white: 'The unhealthy option'
	};

	var fillings = {
		turkey: 'For boring sandwhiches',
		cheese: 'For the vegetarians'
	};

	var sandwhichLibrary = {
		breads: breads,
		fillings: fillings
	};

	// Return the sandwhichLibrary callback function to be accessed by system
	return sandwhichLibrary;
});

// Accessing a library:
librarySystem('sandwhichLibrary');

// window.sandwhichJS has an original value
window.sandwhichLibrary = 'Library with books about sandwhiches';
// Sandwhich JS loads

////// Picking between both

(function () {
	var breads = {
		wheat: 'The healthy option',
		white: 'The unhealthy option'
	};

	var fillings = {
		turkey: 'For boring sandwhiches',
		cheese: 'For the vegetarians'
	};

	var sandwhichLibrary = {
		breads: breads,
		fillings: fillings
	};


	// if librarySystem exists
	if (typeof librarySystem !== 'undefined') {
		// Handle librarySystem case
		librarySystem('sandwhichLibrary', function () {
			return sandwhichLibrary;
		});
	} else {
		// Handle window case

		// Before setting sandwhichLibrary to new value (from original value)
		// 1. Save old library to variable
		// 2. Add .noConflict() method to object
		// 3. .noConflict() resets original value, and returns the local object

		var oldSandwhichLibrary = window.sandwhichLibrary;

		sandwhichLibrary.noConflict = function() {
			// Resets original value (string)
			window.sandwhichLibrary = oldSandwhichLibrary;
			// Return local sandwhichLibrary object
			return sandwhichLibrary;
		};

		// Object is now globally scoped to window to allow access to .noConflict() method
		window.sandwhichLibrary = sandwhichLibrary;
	}

})();

// This will reset window.sandwhichLibrary to the original value -> the string
// .noConflict() method also returns the object, can be set with variable declaration
var sandwhichJS = sandwhichLibrary.noConflict();

// You want to print window.sandwhichLibrary (You want the string, not the JS library).
console.log(sandwhichLibrary);
// -> Prints out the library

// We can still use sandwhichJS
console.log(sandwhichJS.breads.white);
