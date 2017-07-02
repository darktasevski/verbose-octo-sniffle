// while an array stores items continguously, linked list does not
// linked list stores the data for a particular index and a pointer to the next item in the list
// the items can be stored in any ordered but the next item can be found by the address pointing to it
// first item in the linked list is the head
// advantages:
  // O(1) shift, unshift operations
// disadvantages:
  // O(n) element access. Which means we have to go thru all the references for each item to find the one we want
// linked list vocab:
  // Node: each element is called a Node
  // head: first element in the list
  // tail: last element in the list
  // next: usually referring to the pointer in the next node in the list
  // previous: in a double linked list, the pointer ot the previous element in the list

function Node(value) {
  this.value = value;
  this.next = null;
}

// var head = new Node(30);
// head.next = new Node(-85);
// head.next.next = new Node(10);
// head.next.next.next = new Node(0)
// console.log(head.value); // 30
// console.log(head.next.next.value); // 10
// console.log(head);

function SinglyList() {
  this._length = 0;
  this.head = null;
}

// The Methods

SinglyList.prototype.add = function(value) {
  var node = new Node(value);
  var currentNode = this.head;

  // 1st use case, an empty list
  if (!currentNode) {
    this.head = node;
    this._length++;

    return node;
  }

  // 2nd use cae, a non-empty list
  while (currentNode.next) {
    currentNode = currentNode.next;
  }

  currentNode.next = node;

  this._length++;

  return node;
};

// searching for nodes at specific positions in our list
SinglyList.prototype.searchNodeAt = function(position) {
  var currentNode = this.head;
  var length = this._length;
  var count = 1;
  var message = {failure: 'Failure: non-existent node in this list.'};

  // 1st use case, an invalid position
  if (length === 0 || position < 1 || position > length) {
    throw new Error(message.failure);
  }

  // 2nd use case, a valid position
  while (count < position) {
    currentnode = currentNode.next;
    count++;
  }

  return currenNode;
}

// the remove method:
SinglyList.prototype.remove = function(position) {
  var currentNode = this.head;
  var length = this._length;
  var count = 0;
  var message = {failure: 'Failure: non-existent node in this list.'};
  var beforeNodeToDelete = null;
  var nodeToDelete = null;
  var deletedNode = null;

  // 1st use case, an invalid position
  if (position < 0 || position > length) {
    throw new Error(message.failure);
  }

  // 2nd use case, the first node is removed
  if (position === 1) {
    this.head = currentNode.next;
    deletedNode = currentNode;
    currentNode = null;
    this._length--;

    return deletedNode;
  }

  // 3rd use case, any other node is removed
  while (count < position) {
    beforeNodeToDelete = currentNode;
    nodeToDelete = null;
    count++;
  }

  beforeNodeToDelete.next = nodeToDelete.next;
  deletedNode = nodeToDelete;
  nodeToDelete = null;
  this._length--;

  return deletedNode;

};
