const Tree = function(value) {
  this.val = value;
  this.left = null
  this.right = null
}


const findMinDepth = (node) => {
  //base case
  if (!node) {
    return 0;
  }

  //leaf node, so return 1
  if (!node.left && !node.right) {
    return 1;
  }

  //if no left node, recurse to right node
  if (!node.left) {
    return findMinDepth(node.right) + 1;
  }

  //if no right node, recurse to left node
  if (!node.right) {
    return findMinDepth(node.left) + 1;
  }

  //check between left and right side of base node
  return Math.min(findMinDepth(node.left), findMinDepth(node.right)) + 1;
}

let newTree = new Tree(1);
newTree.left = new Tree(2)
newTree.right = new Tree(3)
newTree.left.left = new Tree(4)
newTree.left.right = new Tree(5)
// newTree.right.right = new Tree(6)
// newTree.right.right = new Tree(7)

console.log(findMinDepth(newTree)); //2