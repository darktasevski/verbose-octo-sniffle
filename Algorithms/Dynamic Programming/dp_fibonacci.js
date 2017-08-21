// Write a function that returns the nth number in the Fibonacci sequence,
// using dynamic programming to optimize its run time

const FIB_CACHE = { 1: 1, 2: 1 };

const DYNAMIC_PROG_FIB = n => {
  if (FIB_CACHE[n]) { return FIB_CACHE[n]; }
  FIB_CACHE[n] = DYNAMIC_PROG_FIB(n - 1) + DYNAMIC_PROG_FIB(n - 2);
  return FIB_CACHE[n];
};

// Naive/Non-Dynamic Programming implementation example

const NAIVE_FIB = n => {
  if (n === 1 || n === 2) { return 1; }
  return NAIVE_FIB(n - 1) + NAIVE_FIB(n - 2);
};
