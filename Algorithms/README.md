Algorithm Questions
==

These are questions you can think in your head or clarify with the interviewer. They may lead you to
discover corner cases you might have missed out or even lead you towards the optimal approach!

## Contents

- [Array](array.md)
- [Dynamic Programming and Memoization](dynamic-programming.md)
- [Geometry](geometry.md)
- [Graph](graph.md)
- [Hash Table](hash-table.md)
- [Heap](heap.md)
- [Interval](interval.md)
- [Linked List](linked-list.md)
- [Matrix](matrix.md)
- [Number Theory](number-theory.md)
- [Permutation](permutation.md)
- [Queue](queue.md)
- [Sorting and Searching](sorting-searching.md)
- [Stack](stack.md)
- [String](string.md)
- [Tree](tree.md)

## Steps

- Repeat the question back at the interviewer.
  - Make sure you understand exactly what he is asking.
  - If you misunderstood and when you repeat back the question, he'll clarify.
- Clarify about the question upon hearing it (where relevant).
  - How is the dictionary stored?
  - How big is the input?
  - How big is the range of input values?
  - What kind of input is there? Are there negative numbers? Floating points?
  - Are there duplicates within the input?
  - Extreme cases of the input?
- Explain your high level approach to the interviewer.
  - Consider various approaches and explain out loud why it will/will not work.
  - Start with a brute force approach, even though it is unlikely the one you will be coding.
  - Only start coding after he has given you the go ahead.
- Start coding.
  - Always be explaining what you are currently writing/typing to the interviewer.
- Review your code.
  - Come up with small test cases.
  - Step through the code (not your algorithm!) with those sample input.
  - You should emulate a debugger when stepping through.
- Analyze your code.
  - Give the time/space complexity.
  - Explain trade-offs made in the code possibly in terms of time/space.

## General

- Input validation:
  - Always validate input first. Check if the input is empty, positive, etc. Never assume you are given the valid params. Alternatively, ask interviewers for clarification, which can save you from unnecessary checkings.
- Can the input be preprocessed to reduce lookup time?
- Are there any time/space complexity requirements/constraints?
- Check corner cases:
  - Check for off-by-1 errors.
  - Check that concatenation of values are of same type: int/str/list.
  - After finishing your code, use a few example inputs to test your solution.

## Arrays

- Corner cases:
  - Empty array.
  - Array with 1 or 2 elements.
- Are there duplicate values? Does it affect the answer?
- Check for array out of bounds.
- Is the array sorted or partially sorted? If it is, some form of binary search should be possible.
- Having two indices to traverse/compare two strings/arrays is quite common. For example, we use the same approach to merging two sorted arrays.
- Sorting the array first may significantly simplify the problem.
- Sometimes you can traverse from the right rather than from the left.
- For questions where summation or multiplication of a subarray is involved, pre-computation using hashing or a prefix/suffix sum/product might be useful.
- If question asks for O(1) space, perhaps using the array itself as a hash table might be useful. If array only has positive values from 1 to N, negate the value at that index to indicate presence of that number.

## Binary

- To check if a number is a power of 2, `n & n-1 == 0`.
- Use the XOR operator `^` to flip bits. Usually combined with `1 << k` to shift the k-th bit: `num ^ (1 << k)`.

## Geometry

- When comparing euclidean distance between two points, use dx<sup>2</sup> + dy<sup>2</sup>. It is unnecessary to square root the value.

## Linked Lists

- A dummy node at the head and/or tail might help to handle many edge cases. Be sure to remember to remove them at the end.
- Sometimes linked lists problem can be solved without external storage. Try to borrow ideas from reverse a linked list problem.
- For deletion in linked lists, you can either modify the node values or change the node pointers. You might need to keep a reference to the previous element.
- For partitioning linked lists, create two separate linked lists and join them back together.
- Linked lists problems share similarity with array problems, think about how you would do it for an array and try to apply it to a linked list.
- Two pointer approaches are common:
  - One pointer is k nodes ahead of the other to get the kth from last of the list.
  - One pointer increments twice as much as the other to get the middle of the list.

## Math

- If code involves division, remember to check for division by 0 case.
- Check for and handle overflow/underflow.
- Handle negative numbers.
- Sum of 1 to N = (n+1) * n/2
- Sum of GP = 2^0 + 2^1 + 2^2 + 2^3 + ... 2^n = 2^(n+1) - 1
- Permutations of N = N! / (N-K)!
- Combinations of N = N! / (K! * (N-K)!)
- When a question involves "a multiple of a number", perhaps modulo might be useful.

## Strings

- Ask about character set and case sensitivity.
- Can I use some common data structure that can deal with strings efficiently?
  - [Trie / Prefix Tree](https://www.wikiwand.com/en/Trie)
  - [Suffix Tree](https://www.wikiwand.com/en/Suffix_tree)
- Common string algorithms:
  - [KMP](https://www.wikiwand.com/en/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm) for efficient searching of substring
  - [Rabin Karp](https://www.wikiwand.com/en/Rabin%E2%80%93Karp_algorithm) rolling hash

**Non-repeating Chars**

- Use a 26-bit bitmask to indicate which lowercase latin characters are inside the string.

~~~
mask = 0
for c in set(word):
  mask |= (1 << (ord(c) - ord('a')))
~~~

- To determine if two strings have common characters, perform & and the two bitmasks and if the result is non-zero, the two strings do have common characters. `mask_a & mask_b > 0`

**Anagrams**

- Determine if two strings are anagrams:
  - Sorting both strings should produce the same resulting string.
  - If we map each character to a prime number and the whole string is mapped to the multiples of all the prime numbers of its characters, anagrams should have the same multiple.
  - Frequency counting of characters will help to determine if two strings are anagrams.
- When question is about anagrams, usually can use hash map.
- When you need to compare things regardless of order (like anagram), you may consider hash, hash map.

**Palindromes**

- Determine if a string is a palindrome:
  - Reverse the string and it should be the same as itself.
  - Have two pointers that start at start and end of the string, move inwards till they meet. All the characters should be the same.

**Dictionary (List of words)**

- Preprocess into a trie.
- Two typical ways:
  - Traverse through the whole dictionary.
  - Traverse through the word.
- Having two indices to traverse/compare two string/arrays is quite common. For example, we use the same approach to merging two sorted arrays.

## Trees

- Traverse tree by level - Depth-first search.
- Recursion is common for trees. When you notice the subtree problem can be used to solve the whole problem, you should try recursion.
- When using recursion, always remember to check for base case, usually where the node is `null`.
- It's possible that your recursive function needs to return two values.
- If the question involves summation of paths, be sure to check whether nodes can be negative.

**Binary Trees**

- In-order traversal of a binary tree is insufficient to uniquely serialize a tree. Pre-order/post-order traversal is also required.

**Binary Search Trees**

- In-order traversal will give you all elements in order.
