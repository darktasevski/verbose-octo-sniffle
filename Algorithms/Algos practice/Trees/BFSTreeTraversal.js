const Tree = function(value) {
  this.val = value;
  this.left = null
  this.right = null
}

const BFS = (node, cb) => {
  let queue = [];

  queue.push(node)

  while (queue.length) {
    let temp = queue.shift();
    cb(temp);

    if (temp.left) {
      queue.push(temp.left);
    }
    if (temp.right) {
      queue.push(temp.right);
    }
  }
}

let newTree = new Tree(1);
newTree.left = new Tree(6)
newTree.right = new Tree(3)
newTree.left.left = new Tree(4)
newTree.left.right = new Tree(5)
// newTree.right.left = new Tree(6)
// newTree.right.right = new Tree(7)

BFS(newTree, (node) => console.log(node.val));