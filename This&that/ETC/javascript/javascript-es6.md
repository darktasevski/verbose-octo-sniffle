## ECMAScript 6 ##

`traceur` transpiles ES6 to ES5

[ES6 Compatibility Table](https://kangax.github.io/compat-table/es6/)

firefox nightly builds
chrome release channels

## Variables and Parameters ##

let const default params

### let ###

Previously, the `var` keyword let us define variables with two different scopes - the global scope and the function scope. The new `let` keyword gives us a true block level scoped variable.

This perfectly acceptable JavaScript below works because the `x` is scoped to the function, not to the `if` statement. This means that the declaration for `x` gets hoisted to the top of the function scope, making it available - albeit undefined - immediately.

```javascript
var doWork = function (flag)
{
	if (flag)
	{
		var x = 3;
	}

	return x;
}
```

It will fail, however, if we use the `let` keyword because then the `x` variable *would* be scoped to the `if` statement. 

```javascript
var doWork = function (flag)
{
	if (flag)
	{
		let x = 3;
	}

	return x; // fails because x is out of scope.
}
```

Our error here would be that `x` is not defined, which is semantically different from `x` being undefined. The former means that `x` doesn't exist, while the later means that it exists but has not yet been assigned a value.

This especially comes in handy when doing `for` loops, because the variable used to increment is not leaked out into the function or global scope.

```javascript
function doWork (times)
{
	for (var i = 0; i < times; i += 1)
	{
		// i has been leaked to the function scope.
	}

	for (var i = 0; i < times; i += 1) // this will faile because i has already been declared.
	{
		...
	}
}

function doOtherWork (times)
{
	for (let i = 0; i < times; i += 1)
	{
		// i is scoped to this loop only
	}

	for (let i = 0; i < times; i += 1)
	{
		// i is scoped to this loop only
	}
}
```

### const ###

The `const` keyword also proivdes block level scoping, with the addition of having a read-only value.

```javascript
const MAX_SIZE = 10;
```

But be careful, because this means you can now have multiple variables with the same name, but different *scopes*.

```javascript
function doWork ()
{
	let x = 12;

	var someMethod = function ()
	{
		var x = 10; // different x!
		return x;
	}
}
```

### Destructuring ###

The destructuring assignment syntax is a JavaScript expression that makes it possible to extract data from arrays or objects using a syntax that mirrors the construction of array and object literals - something commonly done in Perl.

**Array destructuring**

```javascript
var foo = ["one", "two", "three"];

// without destructuring
var one   = foo[0];
var two   = foo[1];
var three = foo[2];

// with destructuring
var [one, two, three] = foo
```

**Assignment Without Declaration**

Destructuring assignment can be made without a declaration in the assignment statement.

```javascript
var a, b;
[a, b] = [1, 2];
```

**Swapping Variables**

After executing this code, b is 1 and a is 3. Without destructuring assignment, swapping two values requires a temporary variable (or, in some low-level languages, the XOR-swap trick).

```javascript
var a = 1;
var b = 3;
[a, b] = [b, a];
```

**Multiple-Value Returns**

Thanks to destructuring assignment, functions can return multiple values - again, just like Perl! While it's always been possible to return an array from a function, this provides an added degree of flexibility.

```javascript
function f()
{
  return [1, 2];
}

var a, b;
[a, b] = f();
// a = 1, b = 2

var c = f();
// c = [ 1, 2 ]
```

And - in true Perlesque fashion - all or some of the return values can be safely ignored.

```javascript
function f()
{
  return [1, 2, 3];
}

var [a, , b] = f();
```

**Regular Expression Destructuring**

Check out how easy it becomes to work with regular expressions now!

```javascript
var url = "https://developer.mozilla.org/en-US/Web/JavaScript";

var parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
var [, protocol, fullhost, fullpath] = parsedURL;
```

**Object Destructuring**

Here is a simple example of how to do the same thing with objects instead of arrays.

```javascript
var o = {p: 42, q: true};
var {p, q} = o;

console.log(p); // 42
console.log(q); // true 

// Assign new variable names
var {p: foo, q: bar} = o;

console.log(foo); // 42
console.log(bar); // true
```

And destructuring assignment can be made without a declaration in the assignment statement.

```javascript
var a, b;

({a, b} = {a:1, b:2});
```

>The ( .. ) around the assignment statement is required syntax when using object literal destructuring assignment without a declaration.

**Function Argument Defaults**

All of this leads us to being able to provide default argument values in a function signature.

```javascript
function simpleExample (name="Scott")
{
	...
}

function complexExample({ times: times = 3, greeting : greeting = 'Hello', entity : entity = 'World' } = {}) 
{
	...
}

complexExample({ entity : 'Everybody' }); // everything else is defaulted
``` 

**Nested Object and Array Destructuring**

```javascript
var metadata = {
    title: "Scratchpad",
    translations: [
       {
        locale: "de",
        localization_tags: [ ],
        last_edit: "2014-04-14T08:43:37",
        url: "/de/docs/Tools/Scratchpad",
        title: "JavaScript-Umgebung"
       }
    ],
    url: "/en-US/docs/Tools/Scratchpad"
};

var { title: englishTitle, translations: [{ title: localeTitle }] } = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle);  // "JavaScript-Umgebung"
```

**For-of Iteration and Destructuring**

```javascript
var people = [
  {
    name: "Mike Smith",
    family: {
      mother: "Jane Smith",
      father: "Harry Smith",
      sister: "Samantha Smith"
    },
    age: 35
  },
  {
    name: "Tom Jones",
    family: {
      mother: "Norah Jones",
      father: "Richard Jones",
      brother: "Howard Jones"
    },
    age: 25
  }
];

for (var {name: n, family: { father: f } } of people) {
  console.log("Name: " + n + ", Father: " + f);
}

// "Name: Mike Smith, Father: Harry Smith"
// "Name: Tom Jones, Father: Richard Jones"
```

**Pulling fields from objects passed as function parameter**

```javascript
function userId({id}) {
  return id;
}

function whois({displayName: displayName, fullName: {firstName: name}}){
  console.log(displayName + " is " + name);
}

var user = { 
  id: 42, 
  displayName: "jdoe",
  fullName: { 
      firstName: "John",
      lastName: "Doe"
  }
};

console.log("userId: " + userId(user)); // "userId: 42"
whois(user); // "jdoe is John"
```

This pulls the id, displayName and firstName from the user object and prints them.

**Computed object property names and destructuring**

Computed property names, like on object literals, can be used with destructuring.

```javascript
let key = "z";
let { [key]: foo } = { z: "bar" };

console.log(foo); // "bar"
```

### Rest Parameters ###

The rest parameter syntax allows us to represent an indefinite number of arguments as an array. If the last named argument of a function is prefixed with `...`, it becomes an array whose elements from 0 to theArgs.length are supplied by the actual arguments passed to the function.

```javascript
function(a, b, ...theArgs)
{
  // ...
}
```

In the above example, theArgs would collect the third argument of the function (because the first one is mapped to a, and the second to b) and all the consecutive arguments.

**Difference between rest parameters and the arguments object**

There are three main differences between rest parameters and the arguments object:

- rest parameters are only the ones that haven't been given a separate name, while the arguments object contains all arguments passed to the function;
- the arguments object is not a real array, while rest parameters are Array instances, meaning methods like sort, map, forEach or pop can be applied on it directly;
- the arguments object has additional functionality specific to itself (like the callee property).

### Spread Operator ###

The spread operator allows an expression to be expanded in places where multiple arguments (for function calls) or multiple elements (for array literals) are expected.

```javascript
// given:
function myFunction(x, y, z) { }
var args = [0, 1, 2];

// in ES5:
myFunction.apply(null, args);

// in ES6:
myFunction(...args);
```

**Applying To Arrays**

Today if you have an array and want to create a new array with the existing one being part of it, the array literal syntax is no longer sufficient and you have to fall back to imperative code, using a combination of push, splice, concat, etc. With spread syntax this becomes much more succinct

```javascript
var parts = ['shoulders', 'knees'];
var lyrics = ['head', ...parts, 'and', 'toes']; // ["head", "shoulders", "knees", "and", "toes"]
```

Likewise, where push is often used to push an array to the end of an existing array, ES6 provides a better option.

```javascript
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];

// ES5 append all items from arr2 onto arr1
Array.prototype.push.apply(arr1, arr2);

// ES6 append all items from arr2 onto arr1
arr1.push(...arr2);
```

### Template Literals ###

Template strings are string literals allowing embedded expressions. You can use multi-line strings and string interpolation features with them.

Template strings are enclosed by the back-tick (` `) character instead of double or single quotes. Template strings can contain place holders. These are indicated by the Dollar sign and curly braces (`${expression}`). The expressions in the place holders and the text between them get passed to a function. The default function just concatenates the parts into a single string.

```javascript
let category = "music";
let id = 2212;

// ES5 way to create a url
let url = "http://apiserver/" + category + "/" + id;

// ES6 way to create a url
let url = `http://apiserver/${category}/${id}`;
```

**Using Tags With Templates**

If there is an expression preceding the template string (called a tag),  the template string is called "tagged template string". In that case, the tag expression (usually a function) gets called with the processed template string, which you can then manipulate before outputting.

```javascript
var a = 5;
var b = 10;

function tag(strings, ...values)
{
	console.log(strings[0]); // "Hello "
	console.log(strings[1]); // " world "
	console.log(values[0]);  // 15
	console.log(values[1]);  // 50
	
	return "Bazinga!";
}

tag`Hello ${ a + b } world ${ a * b }`;
// "Bazinga!"
```

Tag functions need not return a string, as shown in the following - rather complex - example.

```
function template(strings, ...keys)
{
	return (function(...values)
	{
		var dict = values[values.length - 1] || {};
		var result = [strings[0]];
		keys.forEach(function(key, i)
		{
			var value = Number.isInteger(key) ? values[key] : dict[key];
			result.push(value, strings[i + 1]);
		});
		return result.join('');
	});
}

template`${0}${1}${0}!`('Y', 'A');  // "YAY!" 
template`${0} ${'foo'}!`('Hello', {foo: 'World'});  // "Hello World!"
```

**Raw Strings**

The special `raw` property, available on the first function argument of tagged template strings, allows you to access the raw strings as they were entered.

```javascript
function tag(strings, ...values)
{
	console.log(strings.raw[0]); 
	// "string text line 1 \\n string text line 2"
}

tag`string text line 1 \n string text line 2`;
```

In addition, the `String.raw()` method exists to create raw strings just like the default template function and string concatenation would create.

## Classes ##



## Functional Programming ##

## Built-In Objects ##

## Asynchronous Development ##

## Objects ##

## Modules ##