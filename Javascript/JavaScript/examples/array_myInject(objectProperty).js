
//defined prototype first, THEN change the object property
Array.prototype.insert = function(index, value) {
  this.splice(index, 0, value);
  return this;
}

Object.defineProperty(Array.prototype, 'insert', {
  enumerable: false
});


//defined prototype INSIDE object property
Object.defineProperty(Array.prototype, 'insert', {
  value(index, value) {
    return this.splice(index, 0, value), this;
  }
});

//both do the same thing

arr = [1,2,3,4,5,6];
console.log(arr.insert(3,10));
