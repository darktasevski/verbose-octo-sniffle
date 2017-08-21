// http://eloquentjavascript.net/04_data.html#p_Wl9gXY97xi

// shift and unshift
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
var todoList = [];
function rememberTo(task) {
  todoList.push(task);
}
function whatIsNext() {
  return todoList.shift();
}
function urgentlyRememberTo(task) {
  todoList.unshift(task);
}

rememberTo("brush teeth");
rememberTo("get groceries");
rememberTo("wash car");
rememberTo("pay bills");

console.log(todoList);        // [ 'brush teeth', 'get groceries', 'wash car', 'pay bills' ]

console.log(whatIsNext());    // brush teeth

urgentlyRememberTo("doctor");

console.log(todoList);        // [ 'doctor', 'get groceries', 'wash car', 'pay bills' ]

console.log(whatIsNext());    // doctor

console.log(todoList);        // [ 'get groceries', 'wash car', 'pay bills' ]

console.log(whatIsNext());    // get groceries

console.log(whatIsNext());    // wash car

console.log(whatIsNext());    // pay bills

console.log(whatIsNext());    // undefined
