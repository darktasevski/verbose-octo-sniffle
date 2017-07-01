const Tree = function(value) {
  this.val = value;
  this.left = null
  this.right = null
}

const findMaxDepth = (node) => {
  //base case
  if (!node) {
    return 0;
  }

  //leaf node, return 1
  if (!node.left && !node.right) {
    return 1;
  }

  //check left node, recur right
  if (!node.left) {
    return findMaxDepth(node.right) + 1;
  }

  //check right node, recur left
  if (!node.right) {
    return findMaxDepth(node.left) + 1;
  }

  return Math.max(findMaxDepth(node.left), findMaxDepth(node.right)) + 1;
}

let newTree = new Tree(1);
newTree.left = new Tree(2)
newTree.right = new Tree(3)
newTree.left.left = new Tree(4)
newTree.left.right = new Tree(5)
// newTree.right.right = new Tree(6)
// newTree.right.right = new Tree(7)
newTree.left.left.left = new Tree(6);

console.log(findMaxDepth(newTree)); //4