# Sorting overview explanation


### Bubble sort:
```
You start with the first two elements of an array, and if they need to be swapped, swap them!
You will need to make multiple passes through the array
```

### Selection sort:
```
You go through the entire array, and mark the index of the highest element, then swap with the far right element 
(every pass, the far right index will be less than before)
You will need to make multiple passes through the array
```

### Insertion sort:
```
The idea is to keep a subset of the array sorted, so start with the first element, which is sorted 
(an array with 1 element is sorted)
then grab the next element and go through the 'sorted subset' and find the spot where it should be inserted
you will be shifting the elements in the 'sorted subset' to the right, as you look for a spot to insert the element 
you grabbed!
You will need to make multiple passes through the 'sorted subset'
```

### Shell sort:
```
'K' = N/2
Loop through the array and swaps with the elements at 'K' distance away.
You will need to make multiple passes through the array, each time, halfing 'K'
then when 'K' is equal to 1, do an Insertion sort
```

### Merge sort:
```
```

### Quick sort:
```
```
