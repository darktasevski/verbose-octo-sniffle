//given a binary tree, is it a binary search tree?

const Tree = require('./Tree.js');

const binaryTreeIsBST = (tree) => {
  return recurseTree(tree, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
}

const recurseTree = (node, min, max) => {
  if (node) {
    if (node.value < min || node.value > max) {
      return false;
    }
    return recurseTree(node.left, min, node.value) && recurseTree(node.right, node.value, max);
  }
  return true;
}

let newTree = new Tree(1);
newTree.left = new Tree(6)
newTree.right = new Tree(3)
newTree.left.left = new Tree(4)
newTree.left.right = new Tree(5)
newTree.left.right.left = new Tree(10)

let newTree2 = new Tree(5);
newTree2.left = new Tree(3)
newTree2.right = new Tree(7)
newTree2.left.left = new Tree(1)
newTree2.left.right = new Tree(4)

console.log(binaryTreeIsBST(newTree))   //false
console.log(binaryTreeIsBST(newTree2))   //true