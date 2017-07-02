//Concat     

var myArray = new Array("1", "2", "3");
myArray = myArray.concat("a", "b", "c"); // myArray is now ["1", "2", "3", "a", "b", "c"]
console.log(myArray);

//join
var myArray = new Array("Wind", "Rain", "Fire");
var list = myArray.join(" - "); // list is "Wind - Rain - Fire"
console.log(list);

//push
var myArray = new Array("1", "2");
myArray.push("3"); // MyArray is now ["1", "2", "3"]
console.log(myArray);

//pop
var myArray = new Array("1", "2", "3");
var last = myArray.pop(); // MyArray is now ["1", "2"], last = "3"
console.log(last);

//shift
var myArray = new Array("1", "2", "3");
var first = myArray.shift(); // MyArray is now ["2", "3"], first is "1"
console.log(first);

//unshift
var myArray = new Array("1", "2", "3");
myArray.unshift("4", "5"); // myArray becomes ["4", "5", "1", "2", "3"]
console.log(myArray);

//slice
var myArray = new Array("a", "b", "c", "d", "e");
myArray = myArray.slice(1, 4);
/* starts at index 1 and extracts all elements
  until index 3, returning [ "b", "c", "d"] */
console.log(myArray);

//splice
var myArray = new Array("1", "2", "3", "4", "5");
myArray.splice(1, 3, "a", "b", "c", "d"); // MyArray is now ["1", "a", "b", "c", "d", "5"]
// This code started at index one (or where the "2" was), removed 3 elements there, 
// and then inserted all consecutive elements in its place.
console.log(myArray);


//reverse
var myArray = new Array("1", "2", "3");
myArray.reverse(); // transposes the array so that myArray = [ "3", "2", "1" ]
console.log(myArray);

//sort
var myArray = new Array("Wind", "Rain", "Fire");
myArray.sort(); // sorts the array so that myArrray = [ "Fire", "Rain", "Wind" ]
console.log(myArray);


//indexOf
var a = ['a', 'b', 'a', 'b', 'a'];
console.log(a.indexOf('b')); // Alerts 1
// Now try again, starting from after the last match
console.log(a.indexOf('b', 2)); // Alerts 3
console.log(a.indexOf('z')); // Alerts -1, because 'z' was not found

//forEach
var a = ['a', 'b', 'c'];
a.forEach(alert); // Alerts each item in turn

//map
var a1 = ['a', 'b', 'c'];
var a2 = a1.map(function(item) { return item.toUpperCase(); });
console.log(a2); // Alerts A,B,C

//filter
var a1 = ['a', 10, 'b', 20, 'c', 30];
var a2 = a1.filter(function(item) { return typeof item == 'number'; });
console.log(a2); // Alerts 10,20,30



var ages = [32, 33, 16, 40];

function checkAdult(age) {
    return age >= 18;
}


function myFunction() {
    console.log(ages.filter(checkAdult));
}



//every

function isNumber(value) {
    return typeof value == 'number';
}
var a1 = [1, 2, 3];
console.log(a1.every(isNumber)); // Alerts true
var a2 = [1, '2', 3];
console.log(a2.every(isNumber)); // Alerts false


//reduce
var a = [10, 20, 30];
var total = a.reduce(function(first, second) { return first + second; }, 0);
alert(total) // Alerts 60

//reduceRight
var a = ['1', '2', '3', '4', '5'];
var left = a.reduce(function(prev, cur) { return prev + cur; });
var right = a.reduceRight(function(prev, cur) { return prev + cur; });

console.log(left); // "12345"
console.log(right); // "54321"


//some
var ages = [3, 10, 18, 20];

function checkAdult(age) {
    return age >= 18;
}

function myFunction() {
    console.log(ages.some(checkAdult));
}



//call

function sayHello(firstName, secondName) {
    console.log(`${this.sayHello()} ${firstName} ${secondName}`);
}

var context = {
    sayHello() {
        return 'Hello';
    }
}

const firstName = 'Alex';
const secondName = 'Perry';

sayHello.call(context, firstName, secondName); //Hello Alex Perry



//apply
function sayHello(firstName, secondName) {
    console.log(`${this.sayHello()} ${firstName} ${secondName}`);
}

var context = {
    sayHello() {
        return 'Hello';
    }
}

const firstName = 'Alex';
const secondName = 'Perry';

sayHello.apply(context, [firstName, secondName]); //Hello Alex Perry

//bind
function sayHello(firstName, secondName, middleName) {
    console.log(`${this.sayHello()} ${firstName} ${middleName} ${secondName}`);
}

var context = {
    sayHello() {
        return 'Hello';
    }
}

const firstName = 'Alex';
const secondName = 'Perry';
const middleName = 'James';

const boundFunc = sayHello.bind(context, firstName, secondName);

boundFunc(middleName); //Hello Alex James Perry



//Scope closure
https: //jsfiddle.net/ankitazilen/9shw82hb/