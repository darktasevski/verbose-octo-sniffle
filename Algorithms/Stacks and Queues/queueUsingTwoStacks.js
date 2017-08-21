class myQueue {
  constructor() {
    this.stackA = [];
    this.stackB = [];
  }

  push(value) {
    this.stackA.push(value);
  }

  pop() {
    if (this.stackB.length === 0) {
      while (this.stackA.length > 0) {
        this.stackB.push(this.stackA.pop());
      }
    }
    return this.stackB.pop();
  }
}


let queue = new myQueue();
queue.push(1)
queue.push(2)
queue.push(3)
queue.push(4)
queue.push(5)
queue.push(6)
queue.push(7)
console.log(queue.pop());
console.log(queue.pop());
console.log(queue.pop());
console.log(queue.pop());