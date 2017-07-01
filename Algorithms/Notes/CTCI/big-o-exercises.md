## Big O exercises

#### 1. Computes the product of `a` and `b`. What is the runtime? 
```java
int product(int a, int b) {
  int sum = 0;
  for (int = 0; i < b; i++) {
    sum += a;
  }
  return sum;
}
```
* O(b) => O(N)

#### 2. Computes `a^b`. What is the runtime?
```java
int power(int a, int b) {
  if (b < 0) {
    return 0; // error
  }
  else if (b === 0) {
    return 1;
  }
  else {
    return a * power(a, b - 1)
  }
}
```
* This function is recursive, however there is a single branch, and it is linearly decreasing. `a` is also kept constant.
* O(b) => O(N)

#### 3. Computes `a % b`. What is the runtime?
```java
int mod(int a, int b) {
  if (b <= 0) {
    return -1;
  }
  int div = a / b;
  return a - div * b;
}
```
* Both values are considered constants here. Time does not increase with each value. 
* O(1)

#### 4. Integer division. What is the runtime (assume `a` and `b` are both positive)?
```java
int div(int a, int b) {
  int count = 0;
  int sum = b;
  while (sum <= a) {
    sum += b;
    count++;
  }
  return count;
}
```
* Runtime increases/decreases based on the ratio of a : b. High `a` and low `b` means more iterations through while loop, and vice versa for low `a` and high `b`.
* O(a / b)

#### 5. Computes the [integer] square root of a number. If number is not a perfect square, it returns -1. Done by successive guessing. If n is 100, it first guesses 50. Too high? Try something lower - halfway between 1 and 50. What is the runtime?
```java
int sqrt(int n) {
  return sqrt_helper(n, 1, n);
}
int sqrt_helper(int n, int min, int max) {
  if (max < min) return -1; // no square root

  int guess = (min + max) / 2;
  if (guess * guess == n) { // found it!
    return guess;
  }
  else if (guess * guess < n) { // too low
    return sqrt_helper(n, guess + 1, max); // try higher
  }
  else { // too high
    return sqrt_helper(n, min, guess - 1); // try lower
  }
}
```
* Assuming `n == 25`, it will take the min (1), and max (25) and divide by 2. `guess = 13`. If too low, it guesses again, increasing min by `guess + 1`. Vice versa for too high. We are narrowing the work by half each run through.
* O(log n)

#### 6. Computes the [integer] square root of a number. This is done by trying increasingly large numbers until it finds the right value, or too high. Runtime?
```java
int sqrt(int n) {
  for (int guess = 1; guess * guess <= n; guess++) {
    if (guess * guess == n) {
      return guess
    }
  }
  return -1;
}
```
* This is linear, as it is using a for loop. However, the max is `guess * guess <= n` which is the same as saying `guess > sqrt(n)`.
* O(sqrt(n))

#### 7. If a binary search tree is not balanced, how long might it take (worst case) to find an element in it?
* ~~Even if a binary search tree is not balanced, it should still take O(log n) times to find the element.~~
* Answer: O(n), where n is the number of nodes in the tree. The max time to find an element is the depth of the tree. The tree could be a straight list downwards and have depth n.

#### 8. You are looking for a specific value in a binary tree, but the tree is not a binary search tree. What is the time complexity of this?
* Since it is not a binary search tree, the assumption here is that it is unordered. So you are essentially guessing at each node.
* Answer: O(n), we have to search through all the nodes

#### 9. The `appendToNew` method appends a value to an array by creating a new, longer array and returning this longer array. You've used the `appendToNew` method to create a `copyArray` function that repeatedly calls `appendToNew`. How long does copying an array take?
```java
int[] copyArray(int[] array) {
  int[] copy = new int[0];
  for (int value : array) {
    copy = appendToNew(copy, value);
  }
  return copy;
}
int[] appendToNew(int[] array, int value) {
  // copy all elements over to new array
  int[] bigger = new int[array.length + 1];
  for (int i = 0; i < array.length; i++) {
    bigger[i] = array[i];
  }
  // add new element
  bigger[bigger.length - 1] = value;
  return bigger;
}
```
* `copyArray` takes atleast O(n) time as it goes through each value in array. Since it also calls `appendToNew` which has its own loop that runs through the array's length, this is running n * n times, where n = array length.
* O(n^2)

#### 10. Sums the digits in a number. What is its big O time?
```java
int sumDigits(int n) {
  int sum = 0;
  while (n > 0) {
    sum += n % 10;
    n /= 10;
  }
  return sum;
}
```
* This function divides by 10 on every iteration of the while loop, and the while loop runs based on how large n is. A number of d digits can have a value up to 10^d. If n = 10^, then d = log n.
* O(log n)

#### 11. Prints all strings of length k where characters are in sorted order. It does this by generating all strings of length k and then checking if each is sorted. Runtime?
```java
int numChars = 26;
void printSortedStrings(int remaining) {
  printSortedStrings(remaining, "");
}
void printSortedStrings(int remaining, String prefix) {
  if (remaining == 0) {
    if (isInOrder(prefix)) {
      System.out.println(prefix);
    }
  }
  else {
    for (int i = 0; i < numChars; i++) {
      char c = ithLetter(i);
      printSortedStrings(remaining - 1, prefix + c);
    }
  }
}
boolean isInOrder(String s) {
  for (int i = 1; i < s.length(); i++) {
    int prev = ithLetter(s.charAt(i - 1));
    int curr = ithLetter(s.charAt(i));
    if (prev > curr) {
      return false;
    }
  }
  return true;
}
char ithLetter(int i) {
  return (char) (((int) 'a') + i);
}
```
* O(kc^k), where k is the length of the string and c is the number of characters in the alphabet. It takes O(c^k) time to generate each string. Then we need to check that each of these is sorted, which takes O(k) time.

#### 12. Computes the intersection (the number of elements in common) of two arrays. It assumes neither array has duplicates. It computes the intersection by sorting one array (array b) and then iterating through array a checking (via binary search) if each value is in b. Runtime?
```java
int intersection(int[] a, int[] b) {
  mergesort(b);
  int intersect = 0;
  for (int x : a) {
    if (binarySearch(b, x) >= 0) {
      intersect++;
    }
  }
  return intersect;
}
```
* Sorting array b takes at least O(b log b) time. Then iterating through array a takes another O(a) time, and checking by binary search if each value is in b (O log b) time.
* O(b log b + a log b)