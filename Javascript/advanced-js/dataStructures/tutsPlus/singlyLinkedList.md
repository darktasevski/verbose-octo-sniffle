Singly-Linked List
==================

* holds sequence of linked nodes
* each node contains data and a pointer
  * pointer points to another node
* imagine singly-linked list to a scavenger hunt
  * each step contains a message and a pointer to the next step

* parts of a linked list:
  * head - the node at the front of the list
  * next - the next node in the list

  ```

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

  ```
