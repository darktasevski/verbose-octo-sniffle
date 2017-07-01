// const Stack = () => {
//   this.stack = [];
// }

class Stack {
  constructor() {
    this.stack  = [];
  }

  push(value) {
    let min = this.min();
    this.stack.push({
      value: value,
      min: Math.min(min !== undefined ? min : Number.POSITIVE_INFINITY, value),
    });
  }

  pop() {
    let item = this.stack.pop();
    return item.value;
  }

  min() {
    if (this.stack.length !== 0) {
      let item = this.stack[this.stack.length - 1];
      return item.min;
    }
  }

  peek() {
    if (this.stack.length !== 0) {
      return this.stack[this.stack.length - 1].value;
    }
  }
}

let stack = new Stack();
stack.push(5);
console.log(stack.peek());
stack.push(4);
stack.push(3);
stack.push(6);
console.log(stack.min());




