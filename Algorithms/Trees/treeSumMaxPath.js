const Tree = function(value) {
  this.val = value;
  this.left = null
  this.right = null
}

// const treeSumMaxPath = (node) => {
//   let leftResults = [];
//   let rightResults = [];

//   // while (node.left) {
//   //   let sum = node.value;
//   //   leftResults.push(sum);
//   //   sum += node.left
//   // }
//   const sumNodes = (node, resultArr) => {
//     let sum = 0;
//     while(node.left || node.right) {
//       sum += node.value;
//       resultArr.push(sum);
//     }

//   }


//   return Math.max(...leftResults) + Math.max(...rightResults) - node.value;
// }

var maxPathSum = function(root) {
    var max = [];
    
    max[0] = Number.NEGATIVE_INFINITY;
    getMaxValueToParent(root, max);
    
    return max[0];
};

/**
* This function returns the max value that contains current node to its parent
*/
function getMaxValueToParent(root, max) {
    if (root === null) {
        return 0;
    }
    
    var left = getMaxValueToParent(root.left, max),
        right = getMaxValueToParent(root.right, max),
        maxPathAcrossRootNotToParent = root.val + left + right, // path that contains current node and will not go to its parent
        maxPathAcrossRootToParent = Math.max(root.val, root.val + Math.max(left, right));
        
    max[0] = Math.max(max[0], maxPathAcrossRootNotToParent, maxPathAcrossRootToParent);
    
    return maxPathAcrossRootToParent;
}

let newTree = new Tree(1);
newTree.left = new Tree(2)
newTree.right = new Tree(3)
newTree.left.left = new Tree(4)
newTree.left.right = new Tree(5)
newTree.right.left = new Tree(6)
newTree.right.right = new Tree(7)

// console.log(maxPathSum(newTree));
// console.log(newTree)