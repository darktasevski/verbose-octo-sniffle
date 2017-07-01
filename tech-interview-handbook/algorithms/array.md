Arrays
==

## Airbnb

- In an arrays of arrays, e.g. given `[[], [1, 2, 3], [4, 5], [], [], [6, 7], [8], [9, 10], [], []]`, print: `1, 2, 3, 4, 5, 6, 7, 8, 9, 10`.
  - Implement an iterator that supports `hasNext()`, `next()` and `remove()` methods.
- Given a list of item prices, find all possible combinations of items that sum a particular value `K`.
- Paginate an array with constraints, such as skipping certain items.
- Implement a circular buffer using an array.
- Given array of arrays, sort them in ascending order.

## Facebook

- Flatten an array iteratively and recursively.
- Given an input array and another array that describes a new index for each element, mutate the input array so that each element ends up in their new index. Discuss the runtime of the algorithm and how you can be sure there would not be any infinite loops.
- Given an array of non-negative numbers, find continuous subarray with sum to S.
  - [Source](http://blog.gainlo.co/index.php/2016/06/01/subarray-with-given-sum/).
- Determine if any 3 integers in an array sum to 0.
  - [Source](http://blog.gainlo.co/index.php/2016/07/19/3sum/).
- Given an array of integers, move all the zeroes to the end while preserving the order of the other elements. You have to do it in-place and are not allowed to use any extra storage.
- Given a list of people, and a function `knows(a, b)` that returns `true`/`false` if person `a` knows the person `b`. Write a function that finds a VIP, which everybody knows and he doesn't know anybody else.
- Given an array of integers, find the subarray with the largest sum. Can you do it in linear time.
  - Maximum subarray sum problem.
- You have an array with the heights of an island (at point 1, point 2 etc) and you want to know how much water would remain on this island (without flowing away).
  - Trapping rain water question.
- Given a sequence of tasks like `A, B, C` (means 3 different tasks), and a cold time, which means you need to wait for that much time to start the next same task, output the best task-finishing sequence.
  - E.g. input: `AAABBB, 2`, output: `AB_AB_AB` ( `_` represents do nothing and wait)
- You are given a list of dominoes. Determine if any two of those dominoes add up to `[6, 6]`.
  - E.g. `[1, 4]` + `[5, 2]`).
- Given an array containing only digits `0-9`, add one to the number and return the array.
  - E.g. Given `[1, 4, 2, 1]` which represents `1421`, return `[1, 4, 2, 2]` which represents `1422`.

## Uber

- Given an array of string, find the duplicated elements.
  - [Source](http://blog.gainlo.co/index.php/2016/05/10/duplicate-elements-of-an-array/).
- Given an array of integers, find a maximum sum of non-adjacent elements.
  - E.g. `[1, 0, 3, 9, 2]` should return `10 (1 + 9)`.
  - [Source](http://blog.gainlo.co/index.php/2016/12/02/uber-interview-question-maximum-sum-non-adjacent-elements/)
- Given an array of integers, modify the array by moving all the zeros to the end (right side). The order of other elements doesn’t matter.
  - E.g. `[1, 2, 0, 3, 0, 1, 2]`, the program can output `[1, 2, 3, 1, 2, 0, 0]`.
  - [Source](http://blog.gainlo.co/index.php/2016/11/18/uber-interview-question-move-zeroes/).
- Given an array, return the length of the longest increasing contiguous subarray.
  - E.g., `[1, 3, 2, 3, 4, 8, 7, 9]`, should return `4` because the longest increasing array is `[2, 3, 4, 8]`.
  - [Source](http://blog.gainlo.co/index.php/2017/02/02/uber-interview-questions-longest-increasing-subarray/).
