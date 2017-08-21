function adding(num1,num2) {
  return num1 + num2;
}

adding.sum = "hello";

console.log(adding.sum);        //"hello"

console.log(adding(5,4));       //9

console.log(Object.getOwnPropertyNames(adding));
//[ 'length', 'name', 'arguments', 'caller', 'prototype', 'sum' ]

console.log(adding.name);                 //adding
// console.log(adding.caller);            //null

console.log(typeof adding.prototype);     //returns object
