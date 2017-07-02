// let TripleStack = () => {
//   this.array = [];
//   this.lengths = [0,0,0];
// }

// TripleStack.prototype.getLength = (stack) => {
//   return this.lengths[stack - 1];
// }

// TripleStack.prototype.push = (stack, value) => {
//   let index = this.getLength(stack) * 3 + stack - 1;
//   this.array[index] = value;
//   this.lengths[stack - 1]++;
// }

// TripleStack.prototype.pop = (stack) => {
//   let length = this.getLength(stack);
//   let value;

//   if (length > 0) {
//     let index = this.getLength(stack) * 3 + stack - 1;
//     value = this.array[index];
//     this.array[index] = undefined;
//     --this.lengths[stack - 1];
//   }
//   return value;
// }

// TripleStack.prototype.peek = (stack) => {
//   let length = this.getLength(stack);
//   let value;

//   if (length > 0) {
//     let index = length * 3 + stack - 1;
//     value = this.array[index];
//   }
//   return value;
// }

class TripleStack {
  constructor() {
    this._array = [];
    this._lengths = [0, 0, 0];
  }

  _getLength(stack) {
    return this._lengths[stack - 1];
  }

  push(stack, value) {
    let idx = this._getLength(stack) * 3 + stack - 1;
    this._array[idx] = value;
    ++this._lengths[stack - 1];
  }

  pop(stack) {
    let length = this._getLength(stack),
      value;
    if (length > 0) {
      let idx = (length - 1) * 3 + stack - 1;
      value = this._array[idx];
      this._array[idx] = undefined;
      --this._lengths[stack - 1];
    }
    return value;
  }

  peek(stack) {
    let length = this._getLength(stack),
      value;
    if (length > 0) {
      let idx = (length - 1) * 3 + stack - 1;
      value = this._array[idx];
    }
    return value;
  }

  isEmpty(stack) {
    return this._getLength(stack) === 0;
  }
}


let newTripleArray = new TripleStack();
newTripleArray.push(1, 'a');
console.log(newTripleArray.peek(1));
newTripleArray.push(2, 'b');
newTripleArray.push(3, 'c');
newTripleArray.push(1, 'd');
newTripleArray.push(2, 'e');
newTripleArray.push(3, 'f');
newTripleArray.push(1, 'g');

console.log(newTripleArray.peek(3));
console.log(newTripleArray.peek(2));
console.log(newTripleArray.peek(1));