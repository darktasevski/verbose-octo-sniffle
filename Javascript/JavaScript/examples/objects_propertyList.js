var student = {
  name : "David Rayy",
  sclass : "VI",
  rollno : 12 };


// 1. Write a JavaScript program to list the properties of a JavaScript object.
function propertyList(obj) {
  return Object.getOwnPropertyNames(obj);
}


console.log(propertyList(student));


/*
2. Write a JavaScript program to delete the rollno property
from the following object. Also print the object before
 or after deleting the property.
*/
function deleteProperty(obj) {
  delete obj.rollno;
  return obj;
}

console.log(deleteProperty(student));

// 3. Write a JavaScript program to get the length of an JavaScript object.
function PropertyLength(student) {
  return propertyList(student).length;
}

console.log(PropertyLength(student));
