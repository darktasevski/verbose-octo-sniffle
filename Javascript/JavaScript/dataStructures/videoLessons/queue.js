// Queue

function Queue() {
  collection = [];

  this.print = function() {
    console.log(collection);
  };

  this.enqueue = function(element) {
    collection.push(element);
  };

  this.dequeue = function() {
    return collection.shift();
  };

  this.front = function() {
    return collection[0];
  };

  this.size = function() {
    return collection.length;
  };

  this.isEmpty = function() {
    return (collection.length === 0);
  };

}

var dogs = new Queue();

dogs.enqueue('Wooferton');
dogs.enqueue('Lady Puffy');
dogs.enqueue('Tippy');
dogs.enqueue('Sassy');
console.log(dogs.isEmpty());
console.log(dogs.front());
console.log(dogs.size());
console.log(dogs.print());

// priority Queues
function PriorityQueue() {
  var collection = [];

  this.printCollection = function() {
    console.log(collection);
  };

  this.enqueue = function(element) {
    if (this.isEmpty()) {
      collection.push(element);
    } else {
      var added = false;
      for (var i = 0; i < collection.length; i++) {
        if (element[1] < collection[i][1]) {
          collection.splice(i, 0, element);
          added = true;
          break;
        }
      }
      if (!added) {
        collection.push(element);
      }
    }
  };

  this.dequeue = function() {
    var value = collection.shift();
    return value[0];
  };

  this.front = function() {
    return collection[0];
  };

  this.size = function() {
    return collection.length;
  };

  this.isEmpty = function() {
   return (collection.length === 0);
  };
}

var tickets = new PriorityQueue();
tickets.enqueue(['Some random', 5]);
tickets.enqueue(['Laura', 1]);
tickets.enqueue(['The Boy', 1]);
tickets.enqueue(['Someone I tolerate', 3]);
tickets.enqueue(['Interesting Person who isn\'t too chatty', 2]);
console.log(tickets.size());
console.log(tickets.isEmpty());
tickets.printCollection();
