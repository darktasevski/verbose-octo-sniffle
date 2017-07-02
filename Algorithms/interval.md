Interval
==

## Airbnb

- Given a list of schedules, provide a list of times that are available for a meeting.
  ```
  [
    [[4,5], [6,10], [12,14]],
    [[4,5], [5,9], [13,16]],
    [[11,14]]
  ]

  Example Output:
  [[0,4], [11,12], [16,23]]
  ```

## Facebook

- Interval ranges:
  - Given 2 interval ranges, create a function to tell me if these ranges intersect. Both start and end are inclusive: `[start, end]`
  - Given 2 interval ranges that intersect, now create a function to merge the 2 ranges into a single continuous range.
  - Now create a function that takes a group of unsorted, unorganized intervals, merge any intervals that intersect and sort them. The result should be a group of sorted, non-intersecting intervals.
  - Now create a function to merge a new interval into a group of sorted, non-intersecting intervals. After the merge, all intervals should remain
  non-intersecting.
- Given a list of meeting times, checks if any of them overlap. The follow-up question is to return the minimum number of rooms required to accommodate all the meetings. [Source](http://blog.gainlo.co/index.php/2016/07/12/meeting-room-scheduling-problem/)
