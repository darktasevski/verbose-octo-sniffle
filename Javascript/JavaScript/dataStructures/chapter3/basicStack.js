function Stack() {
  let items = [];
  this.push = function(element) {
    items.push(element);
  };
  this.pop = function() {
    return items.pop();
  };
  this.peek = function() {
    return items[items.length - 1];
  };
  this.isEmpty = function() {
    return items.length;
  };
  this.size = function() {
    return items.length;
  };
  this.clear = function() {
    items = [];
  };
  this.print = function() {
    console.log(items.toString());
  };
}

let stack = new Stack();
console.log(stack.isEmpty());

stack.push('1 cat');
stack.push('2 kittens');
stack.push('3 blankets');

stack.print();

console.log(stack.peek());

stack.push('4 coffees');
stack.size();
