## Optimizing and Solving code

1. Listen carefully
2. Draw an example
3. State a brute force
4. Optimize
5. Walk through
6. Implement
7. Test

### Look for BUD when optimizing problems:
* **B**ottleknecks
* **U**nnecessary work
* **D**uplicated work

#### Bottlenecks
Part of an algorithm that slows down overall runtime. Two common ways:
1. One time work that slows down algorithm
    * Example:
      - Step 1 of code is O(N log N), step 2 is O(N). Reducing second step to O(1) would not significantly change the overall runtime

2. Chunk of work that is done repeatedly, like searching. Reduce from O(N) to O(log N)

> Example: Given an array of distinct integer values, count the number of pairs of integers that have difference k. Eg: given the array [1, 7, 5, 9, 2, 12, 3], and difference k = 2. There are four pairs with difference 2: [1, 3], [3, 5], [5, 7], [7, 9]

Bruteforced: Start from first element, search through remaining elements. For each pair, compute the difference. If difference = k, increement a counter of difference.

Bottleneck: repeated search of other side. The other side of `(x, ?)` is `x + k` or `x - k`. Sorting the array, we can find other side for each of the N elements in O(log N) time by doing binary search.

Both steps now take totally O(N log N) time. Sorting is now the new bottleneck. Get rid of first step entirely and throw everything into a hash table.

#### Unnecessary work

> Example: Print all positive integer solutions to the equation a^3 + b^3 = c^3 + d^3 where a, b, c, d are integers between 1 and 1000.

Bruteforced: 
```
n = 1000
  for a from 1 to n
    for b from 1 to n
      for c from 1 to n
        for d from 1 to n
          if a^3 + b^3 = c^3 + d^3
            print a, b, c, d
```
Iterates through all possible values of a, b, c, d and checks if that combination happens to work. 

It's unnecessary to continue checking for other possible values of d, only one could work. we should break after we find a valid solution.

If there's only one valid d value for each (a, b, c) then we can just compute it:  
```
d = pow(a^3 + b^3 - c^3, 1/3)
if a^3 + b^3 = c^3 + d^3
  print a, b, c, d
```
This reduces runtime from O(N^4) to O(N^3).

#### Duplicated work

This algo operates by iterating through all `(a, b)` pairs and then searching all `(c, d)` pairs to find if there are any matches to that `(a, b)` pair.

Create a list of `(c, d)` pairs once. Then when we have a an `(a, b)` pair, find the matches within `(c, d)` list. This can be done quickly by inserting each `(c, d)` pair into a hash table that maps from the sum to the pair (or rather, the list of pairs that have that sum).
```
n = 1000
for c from 1 to n
  for d from 1 to n
    result = c^3 + d^3
    append (c, d) to list at value map[result]
for a from 1 to n
  for b from 1 to n
    result = a^3 + b^3
    list = map.get(result)
    for each pair in list
      print a, b, pair
```
Once we have the map of all the `(c, d)` pairs, we can just use that directly. We don't need to generate the `(a, b)` pairs. Each `(a, b)` will already be in the map.
```
n = 1000
for c from 1 to n
  for d from 1 to n
    result = c^3 + d^3
    append (c, d) to list at value map[result]

for each result, list in map
  for each pair1 in list
    for each pair2 in list
      print pair1, pair2
```
Runtime is now O(N^2).


### DYI technique

> Example: Given a smaller string s and a bigger string b, design an algorithm to find all permutations of the shorter string within the longer one. Print the location of each permutation.

```
  s: abbc
  b: cbabadcbbabbcbabaabccbabc
```
Two approaches:
1. Walk through b and look at sliding windows of 4 characters (since s has length 4). Check if each window is a permutation of s.
2. Walk through b. Everytime you see a character in s, check if the next three (length of s) characters are a permutation of s.
