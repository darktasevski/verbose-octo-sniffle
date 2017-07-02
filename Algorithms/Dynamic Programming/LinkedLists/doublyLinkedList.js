const LinkedList = () => {
  this.head = null;
  this.tail = null;
  this.size = 0;
}

const Node = (value) => {
  let node = {};
  node.value = value;
  node.next = null;
  node.prev = null;
  return node;
}

LinkedList.prototype.addToTail = (value) => {
  let node = new Node(value);

  if (this.size === 0) {
    this.head = node;
    this.tail = node;
    node.next = this.tail;
    node.prev = this.head;
  } else {
    this.tail = node;
    node.next = null;
  }
  this.size++;
}

LinkedList.prototype.removeFromTail = () => {
  if (this.size === 0) {
    return;
  } else if (this.size === 1) {
    this.head = null;
    this.tail = null;
  } else {
    let node = this.tail.prev;
    node.prev.next = this.tail;
    this.tail = node.prev;
    //technically unnecessary
    delete node;
    return 
  }
  return
}

LinkedList.prototype.findValue = (value) => {
  let current = this.head;
  while (current.next) {
    if (current.value === value) {
      return true
    }
  }
  return false;
}

LinkedList.prototype.size = () => {
  return this.size
}


const list = new LinkedList();
list.addToTail(1);
console.log(list.size()); //expect 1
list.addToTail(2);
console.log(list.size()); //expect 2
list.removeFromTail();

