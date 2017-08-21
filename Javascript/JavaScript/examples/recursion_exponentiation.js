function exp(b, n) {
  if (n === 0) {
    return 1;
  }
  return exp(b,(n-1)) * b;
}


console.log(exp(3,4));
