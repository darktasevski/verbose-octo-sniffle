// Given any node from a single linked list, write a function that returns true
// if the list is looped and false otherwise. Note that each node only responds
// to a "next" method and, if the list is looped, the first node of the loop is
// not guaranteed to be the first node of the list. Do this in constant/O(1)
// space and linear/O(n) time.

const IS_LIST_LOOPED = node => {
  let firstMarker = node;
  let secondMarker = node.next;
  while (firstMarker !== null && secondMarker !== null) {
    if (firstMarker === secondMarker) { return true; }
    firstMarker = firstMarker.next;
    secondMarker = secondMarker.next;
    if (secondMarker) { secondMarker = secondMarker.next; }
  }
  return false;
};

class Node {
  constructor() {
    this.next = null;
  }
}

class SingleLinkedList {
  constructor() {
    this.nodes = [new Node];
  }

  addNode() {
    let newNode = new Node;
    let currentLastNode = this.nodes[this.nodes.length - 1];
    currentLastNode.next = newNode;
    this.nodes.push(newNode);
  }

  linkList(firstLoopedNode, lastLoopedNode) {
    lastLoopedNode.next = firstLoopedNode;
  }
}
