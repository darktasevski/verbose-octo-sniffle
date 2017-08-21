const Tree = function(value) {
  this.val = value;
  this.left = null
  this.right = null
}


const DFS = (node, cb) => {
  const recurse = (node) => {
    if (node.left) {
      recurse(node.left)
    }

    if (node.right) {
      recurse(node.right)
    }
    cb(node);
  }
  recurse(node);
}

let newTree = new Tree(1);
newTree.left = new Tree(6)
newTree.right = new Tree(3)
newTree.left.left = new Tree(4)
newTree.left.right = new Tree(5)
// newTree.right.left = new Tree(6)
// newTree.right.right = new Tree(7)

DFS(newTree, (node) => console.log(node.val));

