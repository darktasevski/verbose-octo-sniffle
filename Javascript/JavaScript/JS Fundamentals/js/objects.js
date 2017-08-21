(function () {
  'use strict';

var myObject = {

};

console.log(myObject.constructor);
//function Object() { [native code] }
//sees what made this object (constructor)

console.log(myObject.hasOwnProperty('constructor'));
//returns false,
//b/c it was inheritted from the prototype, ==> NOT a custom property

myObject.testProperty = 'test';

console.log(myObject.hasOwnProperty('testProperty'));
//also false
//b/c the object does not have any properties defined...
//now changed ==> true

console.log(myObject.propertyIsEnumerable('constructor'));
//false

console.log(myObject.propertyIsEnumerable('testProperty'));
//true, b/c we made a custom method for the obj, which we can iterate thru with FOR IN

console.log(myObject.toString());
//[object Object]
//is an object... extends the OBJECT constructor

console.log(['test','something','here'].toString());
//test,something,here

console.log(Object.prototype.toString.call([]));
//[object Array]















}());
