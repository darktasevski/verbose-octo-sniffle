class BinaryHeap {
  constructor() {
    this.content = [];
  }

  pop() {
    let result = this.content[0];
    let end = this.content.pop();

    if (this.content.length > 0) {
      this.content[0] = end;
      this.sinkDown(0);
    }
    return result;
  }

  push(value) {
    this.content.push(value);
    this.bubbleUp(this.content.length - 1);
  }

  bubbleUp(pos) {
    if (pos <= 0) {
      return;
    }
    let parentIndex = Math.floor((pos - 1) / 2);
    if (this.content[parentIndex] > this.content[pos] ) {
      this.swap(parentIndex, pos)
      this.bubbleUp(parentIndex);
    }
  }

  sinkDown(pos) {
    var left = 2 * pos + 1;
    var right = left + 1;
    var swapIndex = pos;

    if (left < this.content.length && this.content[left] < this.content[swapIndex]) {
      swapIndex = left;
    }
    if (right < this.content.length && this.content[right] < this.content[swapIndex]) {
      swapIndex = right;
    }

    if (swapIndex !== pos) {
      this.swap(swapIndex, pos);
      this.sinkDown(swapIndex);
    }
  }

  swap(a, b) {
    [this.content[a], this.content[b]] = [this.content[b], this.content[a]];
    // let temp = this.content[a];
    // this.content[a] = this.content[b];
    // this.content[b] = temp;
  }
}

let bh = new BinaryHeap();
bh.push(1)
bh.push(2)
bh.push(3)
bh.push(4)
// bh.push(4)
bh.push(10)
bh.pop();
bh.push(5)
bh.pop();
bh.push(2)
console.log(bh.content)