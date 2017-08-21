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
  {name: 'katherine', age: 12, gpa: 3.5}
];


function getGridLength(length){
  var lengths = [];
  if(length%5===0){
    lengths.push(length/5);
    lengths.push(5);
  }

  if(length%4===0){
    lengths.push(length/4);
    lengths.push(4);
  }

  if(length%3===0){
    lengths.push(length/3);
    lengths.push(3);
  }
  return lengths;
}

function randomStudent(students){
  var arr = [];
  for(var i = students.length-1;i>=0;i--){
    var value = students.splice(Math.floor(Math.random()*students.length),1);
    arr.push(value[0]);
  }
  return arr;
}


function buildChart(seatingChart, students, col, row){
  var randomStudentList = randomStudent(students);

  while(col!==0){
    var studentRow = [];
    randomStudentList.forEach(function(student){
      studentRow.push(student.name);
      if(studentRow.length==row){
        col-=1;
        seatingChart.push(studentRow);
        studentRow = [];
      }
    });
  }
  return seatingChart;
}


function displayChart(seatingChart, row, col){
  seatingChart.forEach(function(row){
    var rowStr = '';
    row.forEach(function(seat){
      rowStr+=checkNameLength(seat) + ' ';
    });
    console.log(rowStr);
  });
}


function checkNameLength(name){
  if(name.length>5){
    return name.slice(0,4);
  }
  else{
    return name;
  }
}


function generateChart(students){
  var seatingChart = [];
  var length = students.length;
  var gridLength = getGridLength(length);

  var row = gridLength[0];
  var col = gridLength[1];

  buildChart(seatingChart, students, col, row);
  displayChart(seatingChart, row, col);

  console.log(`this is the variable seatingChart ${seatingChart.join(' ')}`);
  return seatingChart.join(' ');
}

generateChart(students); //=>

/*in the console:
"ethan alex  sally kathe alexa leah"
"nick  jean  sue   jack  mario monic"
"peter pat   maxam geoff bill  chaaz"
"max   allis kate  adam  shelb mary"
*/
// console.log(students);
