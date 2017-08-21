function Person(first, last) {
   this.name = first + '  ' + last;
   console.log(this.age);
}
 
var marcus = {
  age: 14
};
 
Person.call(marcus); // => 14



// first argument passed you pass is always to THIS

function Person(first, last) {
   this.name = first + '  ' + last;
   console.log(this.age);
}
 
var marcus = {
  age: 14
};
 
// later arguments are passed to the calling fx as the arguments
Person.call(marcus, "Marcus", "Geduld"); // => 14
console.log(marcus.name); // => Marcus Geduld


