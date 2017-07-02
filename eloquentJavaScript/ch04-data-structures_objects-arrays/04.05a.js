// http://eloquentjavascript.net/04_data.html#p_aZEa6qyMum

var day1 = {
  squirrel: false,
  events: ["work", "touched tree", "pizza", "running", "television"]
};

console.log(day1.squirrel); // ---> false
console.log(day1.wolf); //     ---> undefined

day1.wolf = false;

console.log(day1.wolf); //     ---> false

console.log(day1);
/*
{ squirrel: false,
  events: [ 'work', 'touched tree', 'pizza', 'running', 'television' ],
  wolf: false }
*/
