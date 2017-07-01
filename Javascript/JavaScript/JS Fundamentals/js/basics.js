//this is a comment

/*
this
is
a
multiline
comment
*/

// console.log("<3");
// alert("this is an alert!");

var thisIsAVariable = 42,
    anotherVariable = 'bar';

var number = 50;

var string = 'hello';
var quote = '"hello", said the man';
var escaped = 'here\'s an escaped quote';
var joined = string + quote;

var array = [1,2,'3'];

var object = {
  number: 10,
  string: 'hello world'
};

// console.log(object.number);

//useful when using variables to choose which value we want
// console.log(object[`string`]);


var prefix = 5;
var postfix = 5;
var additionAssignment = 1;
additionAssignment += 1;

// remember PEMDAS
var precedence = 1 + 4 * 2;   //9
//paranthesis is highest priority
var precedence2 = (1 + 4) * 2; //10

var string2 = 'Hello';
// var stringObject = new String('hello world');

function getThingByColor(color) {
  var things = {
    red: 'something red',
    green: 'something green',
    blue: 'something blue'
  };

  return things[color] || 'nothing of that color exist';

}
//  getThingByColor('red')
// "something red"
// getThingByColor('black')
// "nothing of that color exist"



var myOtherFunction = function myFunction(message) {
  console.log(message);
};

console.log(hoistedVariable);
var hoistedVariable = 'test';

(function invokedAutomatically() {
  console.log('invoked automatically');
}());

//leading bang syntax
!function alsoInvokedAutomatically() {
  console.log('leading bang syntax to invoke automatically');
}();

var global = 1;
function aFunction() {
  var local = 2;
  console.log(global);
  console.log(local);
}

(function () {
  'use strict';
  console.log(this);      //undefined

  var object = {
    property1: 'i belong to this',
    method: function () {
      return this.property1;
    }
  };

  console.log(object.method());     //this points to the property1 value

  function Person(name) {
    this.name = name;
  }

  var bob = new Person('bob');    //old ES5 way
  console.log(bob.name);
}());

var element = {
  'class': true
};

console.log(element['class']);
