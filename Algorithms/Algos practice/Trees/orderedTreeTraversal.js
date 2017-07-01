const Tree = function(value) {
  this.val = value;
  this.left = null
  this.right = null
}

let newTree = new Tree(1);
newTree.left = new Tree(6)
newTree.right = new Tree(3)
newTree.left.left = new Tree(4)
newTree.left.right = new Tree(5)
// newTree.right.left = new Tree(6)
// newTree.right.right = new Tree(7)

const preOrderTraversal = function (node, cb) {
  cb(node);

  if (node.left) {
    preOrderTraversal(node.left, cb);
  }

  if (node.right) {
    preOrderTraversal(node.right, cb);
  }
}

const inOrderTraversal = function (node, cb) {
  if (node.left) {
    inOrderTraversal(node.left, cb);
  }

  cb(node);

  if (node.right) {
    inOrderTraversal(node.right, cb);
  }
}

const postOrderTraversal = function (node, cb) {
  if (node.left) {
    postOrderTraversal(node.left, cb);
  }

  if (node.right) {
    postOrderTraversal(node.right, cb);
  }

  cb(node);
}

const iterativeInOrderTraversal = (root) => {
  let stack = [];
  let result = [];

  let current = root;
  stack.push(root);
  current = current.left;

  while (current !== null) {
    stack.push(current);
    current = current.left;
  }

  while (stack.length) {
    let temp = stack.pop();
    result.push(temp.val);

    if (temp.right) {
      current = temp.right
      while (current) {
        stack.push(current);
        current = current.left;
      }
    }
  }
  return result;
}

console.log(iterativeInOrderTraversal(newTree));

// preOrderTraversal(newTree, function(node) {
//   console.log(node.val)} 
// )

// inOrderTraversal(newTree, function(node) {
//   console.log(node.val);
// })

// postOrderTraversal(newTree, function(node) {
//   console.log(node.val);
// })
