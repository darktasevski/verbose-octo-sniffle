// Given two nodes in a binary tree, design an algorithm that computes their
// Least Common Ancestor (LCA). Assume that each node has a parent pointer.
//
// For example, given this BST:
//
//            (A)
//           /   \
//         (B)   (F)
//        /   \
//     (C)    (E)
//     /
//   (D)
//
// The LCA of D and E would be B.

const FIND_LEAST_COMMON_ANCESTOR = (nodeOne, nodeTwo) => {
  let nodeOneDepth = GET_DEPTH(nodeOne);
  let nodeTwoDepth = GET_DEPTH(nodeTwo);
  let difference = Math.abs(nodeOneDepth - nodeTwoDepth);
  let shallowerNode = nodeOne;
  let deeperNode = nodeTwo;

  if (difference) {
    deeperNode = nodeOneDepth > nodeTwoDepth ? nodeOne : nodeTwo;
    shallowerNode = nodeOneDepth < nodeTwoDepth ? nodeOne : nodeTwo;

    for (let i = 0; i < difference; i++) {
      deeperNode = deeperNode.parent;
    }
  }

  while (deeperNode.parent) {
    if (deeperNode === shallowerNode) { return deeperNode; }
    deeperNode = deeperNode.parent;
    shallowerNode = shallowerNode.parent;
  }

  if (deeperNode === shallowerNode) { return deeperNode; }
  return null;

};

const GET_DEPTH = node => {
  let nodeDepth = 0;
  let currentNode = node;

  while (currentNode.parent) {
    currentNode = currentNode.parent;
    nodeDepth += 1;
  }

  return nodeDepth;
};

class Node {
  constructor(value, parent) {
    this.value = value;
    this.parent = parent;
  }
}

class BST {
  constructor() {
    this.tree = [];
  }

  addNode(value, parent = null) {
    let node = new Node(value, parent);
    this.tree.push(node);
  }
}

let bst = new BST;
bst.addNode('A');
bst.addNode('F', bst.tree[0]);
bst.addNode('B', bst.tree[0]);
bst.addNode('E', bst.tree[2]);
bst.addNode('C', bst.tree[2]);
bst.addNode('D', bst.tree[4]);

GET_DEPTH(bst.tree[0]); // => 0
GET_DEPTH(bst.tree[1]); // => 1
GET_DEPTH(bst.tree[2]); // => 1
GET_DEPTH(bst.tree[3]); // => 2
GET_DEPTH(bst.tree[4]); // => 2
GET_DEPTH(bst.tree[5]); // => 3

FIND_LEAST_COMMON_ANCESTOR(bst.tree[5], bst.tree[3]); // => Node 'B'
FIND_LEAST_COMMON_ANCESTOR(bst.tree[4], bst.tree[3]); // => Node 'B'
FIND_LEAST_COMMON_ANCESTOR(bst.tree[1], bst.tree[5]); // => Node 'A'
FIND_LEAST_COMMON_ANCESTOR(bst.tree[4], bst.tree[1]); // => Node 'A'
FIND_LEAST_COMMON_ANCESTOR(bst.tree[2], bst.tree[1]); // => Node 'A'
FIND_LEAST_COMMON_ANCESTOR(bst.tree[1], bst.tree[3]); // => Node 'A'
