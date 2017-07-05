// Is not a global variable

/*
var x = 0;
let y = 1;


console.log(x);
console.log("Let = "+y);
*/

























/* Scoped Variable*/
/*
let a = 1;

if (a === 1) {
     let a = 2;
     console.log(a);
} 


console.log(a);
*/

































/* Closure in Loop */
/* Core JavaScript
for (var i = 0; i < 5; ++i) {
  (function(i){
        setTimeout(function () {
            console.log("Inside Loop = "+i);
  }, i*1000); 
  })(i)
}*/

/* ES6 */
/*
for (let i = 0; i < 5; ++i) {
    setTimeout(function () {
        console.log("Inside Loop = "+i);
    }, i*1000); 
}
*/
































// Is not a global variable

/*
var x = 0;
const y = 1;*/



































// Read Only Variable
/*
const a = 5;
console.log(a);
a = 6;
console.log(a);*/































//const creates an immutable binding
/*
const foo = {};
foo.bar = 42;
console.log(typeof(foo));
foo.bar = 10;
console.log(foo.bar);

foo = {test:"123"};*/



































/*Lambda Expression OR Arrow functions*/
/*
let x = 2;
var foo = () => { var y = x * 5; return y*10};

console.log(foo());
*/


/*Arrow Function*/
/*
Arrow functions are typically used for
anonymous functions like those
passed to map and reduce.

Functions like product and average
are better defined the normal way so
their names appear in stack traces.*/

let arr = [1, 2, 3, 4];
let doubled = arr.map(x => x * 2);
console.log(doubled); // [2, 4, 6, 8]
let product = (a, b) => a * b;
console.log(product(2, 3)); // 6
let average = numbers => {
    let sum = numbers.reduce((a, b) => a + b);
    return sum / numbers.length;
};
console.log(average(arr)); // 2.5




/*symbols*/
var arr = ['a', 'b', 'c'];
console.log(Object.getOwnPropertyNames(arr).sort());
// logs ["0", "1", "2", "length"]

// Array-like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.getOwnPropertyNames(obj).sort());
// logs ["0", "1", "2"]

// Logging property names and values using Array.forEach
Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
    console.log(val + ' -> ' + obj[val]);
});
// logs
// 0 -> a
// 1 -> b
// 2 -> c

// non-enumerable property
var my_obj = Object.create({}, {
    getFoo: {
        value: function() { return this.foo; },
        enumerable: false
    }
});
my_obj.foo = 1;

console.log(Object.getOwnPropertyNames(my_obj).sort());
// logs ["foo", "getFoo"]











/*symbols getOwnPropertySymbols*/
var obj = {};
var a = Symbol('a');
var b = Symbol.for('b');

obj[a] = 'localSymbol';
obj[b] = 'globalSymbol';

var objectSymbols = Object.getOwnPropertySymbols(obj);

console.log(objectSymbols.length); // 2
console.log(objectSymbols); // [Symbol(a), Symbol(b)]
console.log(objectSymbols[0]); // Symbol(a)









/*Reflect.ownKeys 

The Reflect.ownKeys method returns an array of the target object's own property keys. Its return value is equivalent to */


Reflect.ownKeys({ z: 3, y: 2, x: 1 }); // [ "z", "y", "x" ]
Reflect.ownKeys([]); // ["length"]

var sym = Symbol.for('comet');
var sym2 = Symbol.for('meteor');
var obj = {
    [sym]: 0,
    'str': 0,
    '773': 0,
    '0': 0,
    [sym2]: 0,
    '-1': 0,
    '8': 0,
    'second str': 0
};
Reflect.ownKeys(obj);
// [ "0", "8", "773", "str", "-1", "second str", Symbol(comet), Symbol(meteor) ]
// Indexes in numeric order, 
// strings in insertion order, 
// symbols in insertion order










/*classes*/

class Shoe {
    constructor(brand, model, size) {
        this.brand = brand;
        this.model = model;
        this.size = size;
        Shoe.count += 1;
    }
    static createdAny() { return Shoe.count > 0; }
    equals(obj) {
        return obj instanceof Shoe &&
            this.brand === obj.brand &&
            this.model === obj.model &&
            this.size === obj.size;
    }
    toString() {
        return this.brand + ' ' + this.model +
            ' in size ' + this.size;
    }
}
Shoe.count = 0;
let s1 = new Shoe('Mizuno', 'Precision 10', 13);
let s2 = new Shoe('Nike', 'Free 5', 12);
let s3 = new Shoe('Mizuno', 'Precision 10', 13);
console.log('created any?', Shoe.createdAny()); // true
console.log('count =', Shoe.count); // 3
console.log('s2 = ' + s2); // Nike Free 5 in size 12
console.log('s1.equals(s2) =', s1.equals(s2)); // false
console.log('s3.equals(s3) =', s3.equals(s3)); // true



/*extends*/

class RunningShoe extends Shoe {
    constructor(brand, model, size, type) {
        super(brand, model, size);
        this.type = type;
        this.miles = 0;
    }
    addMiles(miles) { this.miles += miles; }
    shouldReplace() { return this.miles >= 500; }
}
let rs = new RunningShoe(
    'Nike', 'Free Everyday', 13, 'lightweight trainer');
rs.addMiles(400);
console.log('should replace?', rs.shouldReplace()); // false
rs.addMiles(200);
console.log('should replace?', rs.shouldReplace()); // true




/*Getter and setter method*/
//with message "Cannot set property name
// of #<Person> which has only a getter

class Person {
    constructor(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
}
let p = new Person('Mark');
console.log('name is', p.name); // Mark
p.name = 'Jason';







/*default parameters*/

let today = new Date();

function makeDate(day, month = today.getMonth(), year = today.getFullYear()) {
    return new Date(year, month, day).toDateString();
}
console.log(makeDate(16, 3, 1961)); // Sun Apr 16 1961
console.log(makeDate(16, 3)); // Wed Apr 16 2014
console.log(makeDate(16)); // Sun Feb 16 2014











/*destructing*/
var url = 'https://developer.mozilla.org/en-US/Web/JavaScript';

var parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
console.log(parsedURL); // ["https://developer.mozilla.org/en-US/Web/JavaScript", "https", "developer.mozilla.org", "en-US/Web/JavaScript"]

var [, protocol, fullhost, fullpath] = parsedURL;

console.log("Protocol:", protocol); // "https"
console.log("fullhost:", fullhost);
console.log("fullpath:", fullpath);






function config({ color, size, speed = 'slow', volume }) {
    console.log('color =', color); // yellow
    console.log('size =', size); // 33
    console.log('speed =', speed); // slow
    console.log('volume =', volume); // 11
}
config({
    size: 33,
    volume: 11,
    color: 'yellow'
});








/*Example*/


function report([name, color]) {
    console.log(name + "'s favorite color is", color + '.');
}
let data = ['Mark', 'yellow'];
report(data); // Mark's favorite color is yellow.
let arr = [1, [2, 3],
    [
        [4, 5],
        [6, 7, 8]
    ]
];
let [a, [, b],
    [
        [c],
        [, , d]
    ]
] = arr;
console.log('a =', a); // 1
console.log('b =', b); // 3
console.log('c =', c); // 4
console.log('d =', d); // 8
let obj = { color: 'blue', weight: 1, size: 32 };
let { color, size } = obj;
console.log('color =', color); // blue
console.log('size =', size); // 32
function report2(p1, { weight, color }) {
    console.log(p1, color, weight);
}
report2(19, obj); // 19 blue 1





/* Destructuring rest parameters - Splitting  Array */

/*
let a = [0,1,2];
var b = [...a,6,7];


var x = [5,10,15]
var callMe = function(x,y,z,a,b){
    console.log(x + y + z);
}


callMe(...x);
*/











/*Enhanced Object Literals*/

let obj = {
    number: 2,
    multiply: function(n) { // old way
        return this.number * n;
    },
    times(n) { // new way
        return this.number * n;
    },
    // This doesn't work because the
    // arrow function "this" value is not obj.
    product: n => this.number * n
};
console.log(obj.multiply(2)); // 4
console.log(obj.times(3)); // 6
console.log(obj.product(4)); // NaN




/*for of loop*/

let stooges = ['Moe', 'Larry', 'Curly'];
for (let stooge of stooges) {
    console.log(stooge);
}




let iterable = 'boo';

for (let value of iterable) {
    console.log(value);
}
// "b"
// "o"
// "o"



let iterable = new Map([
    ['a', 1],
    ['b', 2],
    ['c', 3]
]);

for (let entry of iterable) {
    console.log(entry);
}
// ['a', 1]
// ['b', 2]
// ['c', 3]

for (let [key, value] of iterable) {
    console.log(value);
}
// 1
// 2
// 3




(function() {
    for (let argument of arguments) {
        console.log(argument);
    }
})(1, 2, 3);

// 1
// 2
// 3












/*Iterable Objects*/

function objectEntries(obj) {
    let index = 0;
    let keys = Reflect.ownKeys(obj); // gets both string and symbol keys
    return { // note how the iterable and iterator can be same object
        [Symbol.iterator]() { return this; },
        next() {
            if (index === keys.length) return { done: true };
            let k = keys[index++],
                v = obj[k];
            return { value: [k, v] };
        }
    };
}
let obj = { foo: 1, bar: 2, baz: 3 };
for (let [k, v] of objectEntries(obj)) {
    console.log(k, 'is', v);
}





/*Iterator Example #1*/

let fibonacci = {
    [Symbol.iterator]() {
        let prev = 0,
            curr = 1;
        return {
            next() {
                [prev, curr] = [curr, prev + curr];
                return { value: curr };
            }
        };
    }
};
for (let n of fibonacci) {
    if (n > 100) break;
    console.log(n);
}




/*Iterator Example #2*/

let arr = [1, 2, 3, 5, 6, 8, 11];
let isOdd = n => n % 2 === 1;
// This is less efficient than using an iterator because
// the Array filter method builds a new array and
// iteration cannot begin until that completes.
arr.filter(isOdd).forEach(n => console.log(n)); // 1 3 5 11
// This is more efficient, but requires more code.
function getFilterIterator(arr, filter) {
    let index = 0;
    return {
        [Symbol.iterator]: () => ({
            next() {
                while (true) {
                    if (index >= arr.length) return { done: true };
                    let value = arr[index++];
                    if (filter(value)) return { value };
                }
            }
        })
    };
}
for (let v of getFilterIterator(arr, isOdd)) {
    console.log(v); // 1 3 5 11
}











/*Generator yield*/

function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}
for (let value of fibonacci()) {
    if (value > 100) break;
    console.log(value);
}


// Iterables can be
// implemented with generators.
let fib = {
    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        while (true) {
            [prev, curr] = [curr, prev + curr];
            yield curr;
        }
    }
};
for (let n of fib) {
    if (n > 100) break;
    console.log(n);
}











/*More Generator Examples*/

function* gen2(v) {
    try {
        v = yield 'foo' + v;
        v = yield 'bar' + v;
        yield 'baz' + v;
    } catch (e) {
        console.error('caught', e);
    }
}
let iter = gen2(1); // can pass value to generator function,
let result = iter.next(); // but can't pass in first call to next
console.log(result.value); // foo1; result.done is false
result = iter.next(2);
console.log(result.value); // bar2; result.done is false
//iter.throw('stop now'); // triggers catch in gen2
result = iter.next(3);
console.log(result.value); // baz3; result.done is false
result = iter.next(4);
console.log(result.done ? 'done' : result.value); // done










/*Generators For Async*/
function double(n) {
    //multiplies a given number by 2 asynchronously
    return new Promise(resolve => resolve(n * 2));
}

function triple(n) {
    //multiplies a given number by 3 asynchronously
    return new Promise(resolve => resolve(n * 3));
}

function badOp(n) {
    return new Promise((resolve, reject) => reject('I failed!'));
}

/*The magic! This obtains and waits for each of the promises 
that are yielded by the specified generator function.
It is a utility method that would only be written once.*/

function async(generatorFn) {
    let iter = generatorFn();

    function success(result) {
        let next = iter.next(result);
        // next.value is a promise
        // next.done will be true if iter.next is called after
        // the last yield in workflow (on next slide) has run.
        if (!next.done) next.value.then(success, failure);
    }

    function failure(err) {
        let next = iter.throw(err);
        // next.value is a promise
        // next.done will be false if the error was caught and handled.
        if (!next.done) next.value.then(success, failure);
    }
    success();
}
/*Call multiple asynchronous functions in series
in a way that makes them appear to be synchronous.
This avoids writing code in the pyramid of doom style.*/
async(function*() { // passing a generator
    let n = 1;
    try {
        n = yield double(n);
        n = yield triple(n);
        //n = yield badOp(n);
        console.log('n =', n); // 6
    } catch (e) {
        // To see this happen, uncomment yield of badOp.
        console.error('error:', e);
    }
});












/* Enumerable Properties  */
// Object.assign
// a.sub.concat

/*
var a = {name:"dharam",sub:["a","b","c"]} 
var b = Object.assign({},a,{sub:["x",...a.sub,"y"]});
*/

/*
var a = {name:"dharam",sub:["a","b","c"]} 
var b = Object.assign({},a);

b.sub = a.sub.concat(a.sub);

console.log(a.sub);
console.log(b.sub);
*/






























/* Enumerable Properties : Filter */
/*
var a = [0,1,0,2,0,3,0,4,0,5,0,6,0,7];
var b = a.filter((val) => val !== 0);



console.log(b);
console.log(a);
*/

/* ES5 Code 
var a = [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7];
var b = a.filter(function (val) {
  return val !== 0;
});

console.log(b);
*/


































/* classes */
/*
class AnimalES6 {
    constructor(name) {
        this.name = name;
    }

    doSomething() {
        console.log("I'm a " + this.name);
    }
}

var lionES6 = new AnimalES6("Tiger");
lionES6.doSomething();

*/






























/* set and get in classes */
/*
class AnimalES6 {
    constructor(name) {
        this.name = name;
        this._age = 0;
    }

    get age() {
        return this._age;
    }

    set age(value) {
        if (value <= 0) {
            console.log("We do not support undead animals");
        }

        this._age = value;
    }

    doSomething() {
        console.log("I'm a " + this.name);
    }
}

var lionES6 = new AnimalES6("Tiger");
lionES6.doSomething();
console.log(lionES6.age);
lionES6.age = 5;
console.log(lionES6.age);
*/