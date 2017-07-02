const Tree = function(value) {
  this.val = value;
  this.left = null
  this.right = null
}

//do inOrder tree traversal
const BSTtoSortedArray = (tree) => {
  let result = [];

  const recurse = (node) => {
    if (node.left) {
      recurse(node.left)
    }

    result.push(node.val);

    if (node.right) {
      recurse(node.right)
    }
  }

  recurse(tree);
  return result;
}

//build balanced BST from sorted array
const sortedArrayToBalancedBST = (arr) => {
  if (arr.length === 0) {
    return;
  }  
  // console.log('middle: ', middle);
  return helper(arr, 0, arr.length - 1);
}

const helper = function(nums, low, high) {
  if (low > high) { // Done
      return null;
  }
  let mid = Math.floor((low + high )/ 2);
  // var mid = (low + (high - low) / 2)>>0;
  var node = new Tree(nums[mid]);
  node.left = helper(nums, low, mid - 1);
  node.right = helper(nums, mid + 1, high);
  return node;
}

const balanceBST = (tree) => {
  let sortedArray = BSTtoSortedArray(tree);
  let balancedBST = sortedArrayToBalancedBST(sortedArray);
  return balancedBST;
}

//***************** SCOPING ISSUE ***************** */
// const helper = (arr) => {
//   let start = 0;
//   let end = arr.length - 1;

//   if (start > end) {
//     return null;
//   }

//   let middle = Math.floor((start + end )/ 2);
//   // let middle = (start + (end - start) / 2)

//   let root = new Tree(arr[middle]);
//   // console.log('root value ', arr[middle]);

//   root.left = helper(arr.slice(start, middle - 1));
//   root.right = helper(arr.slice(middle + 1, end));

//   return root;
// }


let newTree = new Tree(50);
newTree.left = new Tree(17)
newTree.right = new Tree(76)
newTree.left.left = new Tree(9)
newTree.left.right = new Tree(23)
newTree.right.right = new Tree(9)
newTree.right.right = new Tree(23)

console.log(balanceBST(newTree));