const Tree = require('./Tree.js');

const isBalanced = (tree) => {
  let cache = {
    min: Number.POSITIVE_INFINITY,
    max: Number.NEGATIVE_INFINITY,
  }

  findDepth(tree, cache, 0);
  return cache.max - cache.min <= 1;
}

const findDepth = (node, cache, depth) => {
  if (!node) {
    if (depth < cache.min) {
      cache.min = depth;
    } 
    if (depth > cache.max) {
      cache.max = depth;
    }
  } else {
    findDepth(node.left, cache, depth + 1);
    findDepth(node.right, cache, depth + 1);
  }
}

let newTree = new Tree(1);
newTree.left = new Tree(6)
newTree.right = new Tree(3)
newTree.left.left = new Tree(4)
newTree.left.right = new Tree(5)
newTree.left.right.left = new Tree(10)

let newTree2 = new Tree(1);
newTree2.left = new Tree(6)
newTree2.right = new Tree(3)
newTree2.left.left = new Tree(4)
newTree2.left.right = new Tree(5)

console.log(isBalanced(newTree));   //false
console.log(isBalanced(newTree2));   //true