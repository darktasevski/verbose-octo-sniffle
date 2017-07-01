// //find element within DOM

// const DOMNodeEquality = (domA, domB, elem) => {
//   return findNode(domA, findPath(domB, elem));
// }

// //find path to node from dom1 
// const findPath = (root, target) => {
//   let path = [];
//   let current = root;

//   while (current !== root) {
//     path.unshift(Array.prototype.indexOf.call(current.parentNode.childNodes, current));
//     current = current.parentNode;
//   }
//   return path;
// }

// //find node(target) from path in dom2
// //traverse down the dom from root to current
// const findNode = (root, path) => {
//   var current = root;
//   var len = path.length;

//   for (var i = 0; i < len; i++) {
//     current = current.childNodes[path[i]];
//   }
//   return current;
// }


//recursive implementation of findNode
const findNode = (root, target) => {
  if (root.isEqualNode(target)) {
    return root;
  } else {
    var result = null;
    for (var i = 0; i < root.length; i++) {
      return result = findNode(root.children[i], target)
    }
  }
}

