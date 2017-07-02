class setOfStacks {
  constructor(maxLength) {
    this.maxLength = maxLength;
    this.setOfStack = [[]];
  }

  pop() {
    if (this.setOfStack[this.currentStack].length === 0 && this.setOfStack.length > 1) {
      this.setOfStack.pop();
    }
    return this.setOfStack[this.currentStack].pop();
  }

  push(value) {
    if (this.maxLength >= this.setOfStack[this.currentStack].length) {
      this.setOfStack.push([]);
    } 
    this.setOfStack[this.currentStack].push(value);
  }

  peek() {
    let stack = this.setOfStack[this.currentStack];
    return stack[stack.length - 1];
  }
}

let stack = new setOfStacks(3);
stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)
// console.log(stack.peek());
stack.push(5)
stack.pop();
stack.pop();
stack.pop();
console.log(stack.pop());