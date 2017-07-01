// Write a function that takes in an integer (n) and the head of a singularly
// linked list (with only 'next' and 'value' properties per each node), and
// returns the nth from the last node in the list. Do this in linear time
// (O(n)) and constant space (O(1)) without assuming the input n is always of
// an appropriate range (return null in such cases).

const NTH_TO_LAST_NODE = (n, singleLinkedListHead) => {
  if (n < 0) { return null; }
  let nthNode = singleLinkedListHead;
  let endNode = singleLinkedListHead;
  for (let i = 0; i < n; i++) {
    endNode = endNode.next;
    if (!endNode) { return null; }
  }
  while (endNode.next) {
    nthNode = nthNode.next;
    endNode = endNode.next;
  }
  return nthNode;
};

class Node {
  constructor(value) {
    this.next = null;
    this.value = value;
  }
}

class SingleLinkedList {
  constructor() {
    this.nodes = [new Node('A')];
  }

  addNode(value) {
    let newNode = new Node(value);
    let currentLastNode = this.nodes[this.nodes.length - 1];
    currentLastNode.next = newNode;
    this.nodes.push(newNode);
  }

}

let singleLinkedList = new SingleLinkedList;
singleLinkedList.addNode('B');
singleLinkedList.addNode('C');
singleLinkedList.addNode('D');
singleLinkedList.addNode('E');
singleLinkedList.addNode('F');
singleLinkedList.addNode('G');

const HEAD_NODE = singleLinkedList.nodes[0];

NTH_TO_LAST_NODE(0, HEAD_NODE); // => Node 'G'
NTH_TO_LAST_NODE(6, HEAD_NODE); // => Node 'A'
NTH_TO_LAST_NODE(7, HEAD_NODE); // => null
NTH_TO_LAST_NODE(-1, HEAD_NODE); // => null
NTH_TO_LAST_NODE(4, HEAD_NODE); // => Node 'C'
NTH_TO_LAST_NODE(2, HEAD_NODE); // => Node 'E'
NTH_TO_LAST_NODE(1, HEAD_NODE); // => Node 'F'
NTH_TO_LAST_NODE(3, HEAD_NODE); // => Node 'D'
