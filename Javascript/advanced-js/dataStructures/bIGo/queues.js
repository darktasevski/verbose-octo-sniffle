// queues are First In First out
// like a grocery line up. Person at the head of the line goes First

// common queue operations:
// enqueue: add an item to back of the line
// dequeue: return the first item in the queue
// length - how many items int he queue

// real world examples:
// prioritization
// searching algorithms
// job/process scheduling

// enqueue and dequeue are O(n) operations

function Queue() {
  var queue = [];

  this.enqueue = function(val) {
    return this.queue.push(val);
  };

  this.dequeue = function() {
    return this.queue.shift();
  };

  this.size = function() {
    return this.queue.length;
  };

  this.print = function() {
    return this.queue;
  };
}

var cats = new Queue();
cats.enqueue('Fluffy');
cats.print();
cats.enqueue('Lula');
cats.enqueue('Chippy');
cats.enqueue('Arvin');
cats.print();
