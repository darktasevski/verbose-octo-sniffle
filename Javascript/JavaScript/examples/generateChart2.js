// jshint esversion: 6
//# Seating chart pt 1

//You are a teacher with n students (say 24 students or 25 students).

//Write a function that draws an MxN (e.g., 4x6 or 5x5) seating chart.
//The seating chart order should be random. Clip names to a max length in order to make them fit.


//# Seating chart pt 1

//You are a teacher with n students (say 24 students or 25 students).

//Write a function that draws an MxN (e.g., 4x6 or 5x5) seating chart.
//The seating chart order should be random. Clip names to a max length in order to make them fit.

var students = [
  {name: 'bill', age: 14, gpa: 3.3},
  {name: 'max', age: 15, gpa: 3.7},
  {name: 'jean', age: 12, gpa: 3.2},
  {name: 'mary', age: 16, gpa: 3.8},
  {name: 'alex', age: 11, gpa: 2.7},
  {name: 'kate', age: 15, gpa: 3.9},
  {name: 'leah', age: 12, gpa: 3.8},
  {name: 'pat', age: 13, gpa: 3.1},
  {name: 'sally', age: 12, gpa: 3.5},
  {name: 'sue', age: 12, gpa: 2.5},
  {name: 'peter', age: 13, gpa: 1.4},
  {name: 'geoffry', age: 14, gpa: 3.3},
  {name: 'adam', age: 15, gpa: 2.7},
  {name: 'jack', age: 12, gpa: 1.2},
  {name: 'shelby', age: 16, gpa: 3.8},
  {name: 'ethan', age: 11, gpa: 2.7},
  {name: 'chaazi', age: 15, gpa: 1.9},
  {name: 'monica', age: 12, gpa: 3.8},
  {name: 'nick', age: 12, gpa: 3.5},
  {name: 'marion', age: 12, gpa: 1.5},
  {name: 'allison', age: 15, gpa: 3.9},
  {name: 'alexander', age: 12, gpa: 1.8},
  {name: 'maxamillion', age: 13, gpa: 3.1},
  {name: 'katherine', age: 12, gpa: 3.5},
  {name: 'bo', age: 26, gpa: 2.0}
];

//randomize array
function randomizeArray(orderedArray) {     //array of obj
  let randomized = [];
  let dummy_index = [];

  for (let d = 0; d < orderedArray.length; d += 1) {
    dummy_index[d] = d;
  }
  for (let j = orderedArray.length -1; j >= 0; j -= 1) {     //looping thru dummy_index
    let ri = dummy_index.splice(Math.floor(Math.random() * dummy_index.length),1);
    randomized.push(orderedArray[ri]);
  }
  return randomized;
}

function sortByProp(arr, prop) {       //array of students(objs)
  let propSorted = arr.sort(function(student1, student2) {
  let property = age;
    return `student1.${prop} - student2.${prop}`;
  });
  return propSorted;
}

// console.log(sortByAge(students));

function nestedShuffle(arr) {     //BUILT 2d array of students
  let ageShuffled = arr.map(function (student) {
    return randomizeArray(student);
  });
  return ageShuffled;
}


//clipped names
function pullStudent(arr) {
  return arr.map(function(obj) {
    let student = obj.name.slice(0,5);

    while (student.length < 5) {
      student += " ";
    }
    return student;
  });
}
// console.log(pullStudent(randomizeArray(students)));
function getDimensions(arr) {
  let dimension = [];

  for (let i = 5; i > 2; i -= 1) {
    if (arr.length % i === 0) {
      dimension.push(arr.length/i);
      dimension.push(i);
      return dimension;
    }
  }
}

// console.log(getDimensions(students));

function buildArray(arr) {    //arr of students
  let row = getDimensions(arr)[1];
  let column = getDimensions(arr)[0];
  let temp_row = [];
  let builtArray = [];

  for (let r = 0; r < row; r += 1) {
    for (let c = 0; c < column; c += 1) {
        let i = ( (r*column) +c );
        temp_row.push(arr[i]);
    }
    builtArray.push(temp_row);
    temp_row = [];
  }
  return builtArray;
}
  // console.log(buildArray(pullStudent(randomizeArray(students))));

function joinChart(arr) {   //2d array
  return arr.map(function(row) {
    row = row.join(' ');
    console.log(row);
    return row;
  });
}

function generateChart(student, prop) {                //students array

  // determineChart(prop, shuffleNestedArr);
  let randomizedChart = randomizeArray(student);
  let sortedProp = sortByProp(randomizedChart, prop);
  let names = pullStudent(sortedProp);
  let builtNames = buildArray(names);
  let shuffledProp = nestedShuffle(builtNames);
  return joinChart(shuffledProp);

  // let sortedAge = sortByAge(student);
  // let names = pullStudent(sortedAge);
  // let names2 = buildArray(names);
  // let shuffledAge = nestedShuffle(names2);
}

// generateChart(students, 'age');



function determineChart(prop, shuffleNestedArr) {
  switch (property) {
    case "name":
      prop = name;
      shuffleNestedArr= false;
      break;

    case "age":
      prop = age;
      shuffleNestedArr = true;
      break;

    case "gpa":
      prop = gpa;
      shuffleNestedArr = true;
      break;

  }
  return(prop, shuffleNestedArr);
}

const readline = require('readline');

const reader = readline.createInterface({

  input: process.stdin,
  output: process.stdout
});

reader.question("which choice??", function (choice) {
  console.log(`You chose: ${choice}!`);
  return choice;
});
