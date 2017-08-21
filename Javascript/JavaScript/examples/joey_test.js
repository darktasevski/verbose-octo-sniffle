var _ = require('underscore');

function test(expectedResult, actualResult, expectedText){
  if(expectedResult==actualResult){
    console.log('passed');
  }
  else{
    console.log(expectedText);
  }
}

var arr = [1,2,3,4,5];


function timesTwo(value){
  return value*2;
};

function isEven(value){
  return value%2===0;
}


var newwArr = arr.filter(function(value){
  return isEven(value);
});


function addTwo(value){
  return value+2;
}

//test(addTwo(1), 4, 'should return 3 if value in addTwo is 1');

function gpatest(actualgrade)
{
 switch (actualgrade)
     {case 'A':
    if (actualgrade >= 90)
     console.log('A');
     break;
   case 'B':
     if (80 >= actualgrade < 90)
     console.log('B');
     break;
   case 'C':
     if (70 >= actualgrade < 80)
     console.log('C');
     break;
   case 'D':
     if (60 >= actualgrade < 70)
     console.log('D');
     break;
   default:
     console.log('you failed');
     break;
 }
};

function gpatest(actualgrade){
  if(actualgrade>=90){
    return 'A';
  }
  else if(actualgrade>=80){
    return 'B';
  }
  else if(actualgrade>=70){
    return 'C';
  }
  else if(actualgrade>=60){
    return 'D';
  }
  else{
    return 'F';
  }
}


//test(gpatest(75), 'C', 'supposed to return C');
//test(gpatest(99), 'A', 'supposed to return A');

var object = {
  kai: 'person',
  luna: 'cat',
  joey: 'person'
};

//console.log(object.kai);

/*for(var value in object){
  console.log(object[value]);
}*/

//console.log(object['joey']);


var dataSet = [
  {name: 'blah', values: [1,2,3,4,5]},
  {name: 'blah2', values: [4,5,6,7,8]},
  {name: 'blah3', values: [10,11,12,13,14]}
];

//console.log(dataSet[0]);

function dataS(arr)
{

var newArr = [];
arr.forEach(function(index){
  if(index.value > 21)
  {
  newArr.push(index);
  }
});
console.log(newArr);
};


//dataS(dataSet);
//index.values.forEach


function evenValues(data)
{
  var evenArr = [];
  dataSet.forEach(function(index)
  {
    index.values.forEach(function(i)
    {
    if(i %2 ==0)
    {
      evenArr.push(i);
    };
    });
  });
  return evenArr;
};

console.log(evenValues(dataSet));
