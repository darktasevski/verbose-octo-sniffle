//given a sorted array (in ascending order), make a BST with min height'

class Tree {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

const makeBST = (sortedArr) => {
  let middleN = Math.floor(sortedArr.length / 2);
  let leftArr = sortedArr.slice(0, middleN);
  let rightArr = sortedArr.slice(middleN + 1, sortedArr.length);
  
  //make middle node
  let node = new Tree();

  node.value = sortedArr[middleN];

  //make left node
  if (leftArr.length) {
    node.left = makeBST(leftArr);
  }

  //make right now
  if (rightArr.length) {
    node.right = makeBST(rightArr);
  }
  return node;
}

console.log(makeBST([1,2,3,4,5,6]));