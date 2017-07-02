//# Seating chart pt 1

//You are a teacher with n students (say 24 students or 25 students).

//Write a function that draws an MxN (e.g., 4x6 or 5x5) seating chart.
//The seating chart order should be random. Clip names to a max length in order to make them fit.

let students = [
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

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

//randomized, array of all students
function randomizeStudents(arr) {
  let randomized = shuffle(arr);

  return arr.map(function(people) {
    return people['name'];
  });
people.name.toString();
}

console.log(randomizeStudents(students));

generateChart('random'); //=>

/*in the console:
"ethan alex  sally kathe alexa leah"
"nick  jean  sue   jack  mario monic"
"peter pat   maxam geoff bill  chaaz"
"max   allis kate  adam  shelb mary"
*/

/*-------------------------------------------------------------------------------------*/



//# Seating chart pt 2

//This is an extension of your earlier work on the "Seating chart" problem.

//Augment your solution to track the ages of the students.
//Make sure that students are seated such that younger students are closer
//to the front of the class (the "top" of the chart) and older students are
//closer to the back of the class.



/*-------------------------------------------------------------------------------------*/



//# Seating chart pt 3

//This is an extension of the "seating chart" problem.

//Augment your solution such that we track a set of grades that each student has earned so far.
//Arrange the students such that those with the worst average grade are closest to the
//front of the class (the "top" of the chart) and those with the best average grade
//are closest to the back of the class.

//Don't lose the ability to also arrange the seating by age, or randomly.
//Cleanly parameterize the choice among 3 seating arrangement strategies.



/*-------------------------------------------------------------------------------------*/



//# Seating chart pt 4

/*
This is an extension of the seating chart problem.

Given a seating chart, allow the caller to request a rotation of a row or the rotation of a column.

For example:

Joe Bob Karen
Fred Jill Horace
Gary Mary Harry

After rotating the first row, it would be:
Karen Joe Bob
Fred Jill Horace
Gary Mary Harry

Then, after rotating the first column, it would be:
Gary Joe Bob
Karen Jill Horace
Fred Mary Harry

Extension:
By default it rotates by 1 slot.   Allow rotating by any number of slots.

*/
