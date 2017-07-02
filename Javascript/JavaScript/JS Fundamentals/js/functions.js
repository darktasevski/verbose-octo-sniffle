(function () {
'use strict';

var testFunction = function testFunction(arg1, arg2) {
  return arg1 + arg2;
}

console.log(testFunction.length);   //2

var person = {
  name: 'Kai',
  job: 'developer'
}

function introduce(inductee) {
  console.log('Hey ' + inductee + '! My name is ' + this.name + ', and I\'m a ' + this.job);
}

// introduce();    //this.name and this.job is undefined.... so we get a type error!
introduce.call(person, 'BoBo'); //Hey! My name is Kai, and I'm a developer

function chat(respondent, subject) {
  console.log('so... ' + respondent + ', what about the ' + subject + ' huh? Pretty good for a ' + this.job + ' like me right?');
}

function engage(mode, object, args) {
   //arguments: name of fx, object to use as this, array of the rest of the arguments
  mode.apply(object,args);
}

engage(introduce, person, ['BoBa']);
engage(chat, person, ['Bear', 'panda']);

function addToCart(fee, price) {
  if(!this.total) {
    this.total = 0;
  }
  console.log(fee);
  this.total += price += fee || 0;
  return this.name + '\'s cart total is $' + this.total;
}

var kaisCart = addToCart.bind(person, 1);      //the person object will be the THIS
console.log(kaisCart(25));
console.log(kaisCart(100));


}());
