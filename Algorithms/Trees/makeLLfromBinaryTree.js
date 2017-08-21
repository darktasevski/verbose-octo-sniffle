//given a binary tree, make a list for each depth

const makeList = (node) => {
  let lists = [];
  addToList(lists, node, 0);
  return lists;
}

const addToList = (list, node, depth) => {
  if (node) {
    //if new depth, make a new array 
    if (!list[depth]) {
      list[depth] = [];
    }
    //add node value to the depth
    list[depth].push(node.value);

    //check left and right
    addToList(list, node.left, depth + 1);
    addToList(list, node.right, depth + 1);
  }
}

const Tree = function(value) {
  this.value = value;
  this.left = null
  this.right = null
}

let newTree = new Tree(1);
newTree.left = new Tree(6)
newTree.right = new Tree(3)
newTree.left.left = new Tree(4)
newTree.left.right = new Tree(5)

console.log(makeList(newTree));   //[[1], [6, 3], [4, 5]]