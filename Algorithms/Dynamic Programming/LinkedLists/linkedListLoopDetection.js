//in a singly linked list, find if there is a loop. return the node where there is a loop
// A -> B -> C -> D -> E -> C
// return C


// O(n) time
// O(N) space
const loopDetection1 = (list) => {
  let visited = new Set();
  let node = list;

  while (node) {
    if (visited.has(node)) {
      return node;
    }
    visited.add(node);
    node = node.next;
  }

  return undefined;
}


// O(n) time
// O(1) space
const loopDetection2 = (list) => {
  let fast = list;
  let slow = list;

  while (slow.next && fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {    //there is a loop
      break;
    }
  }

  if (!slow || slow !== fast) {   //there's no loop
    return null;
  }

  //b/c the loop will be off by k nodes™∑
  slow = list;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return fast;
}