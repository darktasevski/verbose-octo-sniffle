# Big O Notation
 
The language and metric used to describe the efficiency of algorithms.

// Consider this scenario:
- A file on a hard drive that needs to be sent to a friend who lives across the country

- Options:
  Small file: 
  - Email, FTP, electronic transfer

  Large file (1 TB+):
  - It is faster to send physically (via airplane or drive)

### Time Complexity
-- Asymptotic runtime (big O time)

* Electronic transfer: O(s), where 's' is the size of the file
  - The time to transfer the file increases linearly with the size of the file

* Airplane transfer: O(1), with respect to the size of the file.
  - As the size of the file increases, it won't take any longer to get the file to friend. The time is constant

### Space Complexity
-- Amount of memory (or space) required by an algo

- Array of size 'n' requires O(n) space
- 2D array of size 'n' * n' requires O(n^2) space

#### Example 1:
Stack space in recursive calls
-- O(n) time and O(n) space:

```java
int sum(int n) {
  if (n <= 0) {
    return 0;
  }
  return n + sum(n - 1);
}
```
Each call adds a level to the stack
```
sum(4)
  -> sum(3)
    -> sum(2)
      -> sum(1)
        -> sum(0)
```
Each of these calls is added to the call stack and takes up actual memory.

#### Example 2:
O(n) time, O(1) space

```java
int pairSumSequence(int n) {
  int sum = 0;
  for (int i = 0; i < n; i++) {
    sum += pairSum(i, i + 1);
  }
  return sum;
}
int pairSum(int a, int b) {
  return a + b;
}
```
There will be O(n) calls to `pairSum`. But these calls do not exist simultaneously on the call stack, so you only need O(1) space.

### Drop the constants
It is possible for O(n) code to run faster than O(1) code for specific inputs. Big O just describes the rate of increase.

For this reason, constants are dropped in runtime. An algo that might be described as O(2n) is actually O(n).

#### Example 3:
```java
int min = Integer.MAX_VALUE;
int max = Integer.MIN_VALUE;
// x : array denotes 'for each'
for (int x : array) {
  if (x < min) min = x;
  if (x > max) max = x;
}
```
```java
int min = Integer.MAX_VALUE;
int max = Integer.MIN_VALUE;
for (int x : array) {
  if (x < min) min = x;
}
for (int x : array) {
  if (x > max) max = x;
}
```
Which one is faster? This question might only be answered at the assembly level and compiler optimization.

### Drop the non-dominant terms
O(n^2 + n) should be just O(n^2)
O(n + log n) becomes O(n)
O(5*2^n + 1000n^100) becomes O(2^n)

However, the expression:
O(b^2 + a) cannot be reduced (without some special knowledge of 'a' and 'b').

Big O time describes the rate of increase!

### Multi-part algorithms
When to multiply runtimes vs add?

#### Add the runtimes: O(A + B):
```java
for (int a : arrA) {
  print(a);
}
for (int b : arrB) {
  print(b);
}
```
- Do A chunks of work, then B chunks of work

#### Multiply the runtimes: O(A * B):
```java
for (int a : arrA) {
  for (int b : arrB) {
    print(a + "," + b);
  }
}
```
- Do B chunks of work for each element in A

### Amortized Time
Consider an `ArrayList` which grows in capacity as elements are inserted. When it hits capacity, a new array with double capacity is created and all the elements are copied over. 

If the array is full, and it contains 'N' elements, then inserting a new element will take O(N) time. Creating a new array will be size 2N. However, the vast majority of the time, inserting an element will be O(1) time.

'Amortized time' states that this phenomenom only happens very rarely, so the cost is 'amortized.'

As elements are inserted, capacity is doubled when size of array is a power of 2. So after X elements, capacity doubles at array sizes 1, 2, 4, 8, 16, ..., X. The doubling takes 1, 2, 4, 8, 16, ..., X copies. Sum of 1 + 2 + 4 + 8 + ... + X is roughy 2X.

X insertions takes O(2X) time, amortized time for each insertion is O(1).

### Log N Runtimes

Suppose we have a sorted array, and we are trying to find a number inside using binary search. We first compare the number to the midpoint of the array, if `x == middle` we return it. If `x < middle` we search left; if `x > middle` we search right. 
```
  search 9 within [1, 5, 8, 9, 11, 13, 15, 19, 21]
    compare 9 to 11 -> smaller
    search 9 within [1, 5, 8, 9, 11]
      compare 9 to 8 -> bigger
      search 9 within [9, 11]
        compare 9 to 9
        return
```
Start off N-element array to search. After a single step, we're down to N/2 elements. Another step and we're down N/4 elements. 

Total runtime is how many steps (dividing N by 2 each time) until N becomes 1:

```
N = 16  
N = 8   // Divide by 2  
N = 4   // Divide by 2  
N = 2   // Divide by 2   
N = 1   // Divide by 2  
```

Now flipped, we can go from 1 to 16, how many times we can multiply 1 by 2 until we get N?

This is `2^k = N`  
```
2^4 = 16 -> log2 16 = 4
log2 N = k -> 2^k = N
```
If the number of elements in the problem space gets halved each time, that will likely be a O(log N) runtime.

### Recursive Runtimes

Consider
```java
int f(int n) {
  if (n <= 1) {
    return 1;
  }
  return f(n - 1) + f(n - 1);
}
```
This tree will have depth N. Each (node) function call has 2 children. Therefore each level will have twice as many calls as the one above it.

|Level|# Nodes|Also expressed as...|Or...|
|-----|:-----:|:------------------:|----:|
|0    |1      |                    |2^0
|1    |2      |2 * previous level = 2|2^1
|2    |4|2 * previous level = 2 * 2^1 = 2^2| 2^2
|3    |8|2 * previous level = 2 * 2^2 = 2^3| 2^3
|4    |16|2 * previous level = 2 * 2^3 = 2^4|2^4

The runtime for a recursive function making multiple calls: O(branches^depth), where branches is the number of times each recursive call branches. In this case, O(2^N).

(Side note: the sum of a sequence of powers of two is roughly equal to the _next_ value in the sequence.)

Big O time describes the rate of increase!  
_Big O time describes the rate of increase!_  
**Big O time describes the rate of increase!**   
_**Big O time describes the rate of increase!**_   
