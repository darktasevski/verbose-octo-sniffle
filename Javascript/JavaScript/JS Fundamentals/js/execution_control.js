

(function () {
  'use strict';

  if ( 1 + 1 === 2) {
    console.log('condition is true');
  }


  if (1) {
    console.log('this is a truthy statement');
  }

    //ternary
  (true) ? console.log('this one is true') : console.log('this one is false');


  var switcher = 'one';
  switch (switcher) {
    case 'one':
      console.log('one');
      break;
    case 'two':
      console.log('two');
      break;
    default:
      console.log('three');
  }


  var myArray = ['one', 'two', 'three'];

  for(var i = 0, j = myArray.length; i < j; i += 1) {
    console.log(myArray[i]);

  }

var myObject = {
  prop1: 'property1',
  prop2: 'property2'
};

for(var prop in myObject) {
    console.log(myObject[prop]);

}

var limit = 0;
while(limit < 5) {
  if (limit === 3) {
    break;
  }
  console.log(limit += 1);
}

var condition = true;
do {
  console.log('once');
  break;
} while (condition);















}());
