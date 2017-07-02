// .call(), .apply() & .bind() functions

function foo(a, b){
	return this.name + ' ' +a+ ' ' +b;
}

brian = {
	name: 'brian'
};


erich = {
	name: 'erich'
};

// the first argument is the value of `this` inside the foo function
// call() accepts an argument list. 
foo.call(brian, 1, 2); // "brian 1 2"
foo.call(erich, 3, 4); // "erich 3 4"

// the first argument is the value of `this` inside the foo function
// apply() accepts a single array of arguments.
foo.apply(brian, [1, 2]); // "brian 1 2"
foo.apply(erich, [3, 4]); // "erich 3 4"

// the first argument is the value of `this` inside the foo function
// bind()  accepts an argument list.
b = foo.bind(brian, 1, 2);
b(); // "brian 1 2"
e = foo.bind(erich, 3, 4);
e(); // "erich 3 4"
