function fib(n) {

  if (n === 2) {
    return [0,1];
  }
    else if (n === 1) {
      return [0];
    }
      else if (n <= 0)
        return [];

  let r = fib(n-1);
  r.push((r[r.length - 2] + r[r.length - 1]));
  return r;

}

console.log(fib(98));
