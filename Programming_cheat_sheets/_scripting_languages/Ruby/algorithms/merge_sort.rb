# merge sort
# https://www.youtube.com/watch?v=EeQ8pwjQxTM&index=4&list=PLkz7N1M-fxZgj_UIs_LqT5WDdCsbC0U7r
# http://www.tutorialspoint.com/data_structures_algorithms/merge_sort_algorithm.htm

# basically getting 2 sorted arrays,
# and comparing the first elements of both
# and the smaller value gets inserted to a third array

# O(n) because there is a comparisson on almost all elements

# algorithm:

# Step 1 − if it is only one element in the list it is already sorted, return.
# Step 2 − divide the list recursively into two halves until it can no more be divided.
# Step 3 − merge the smaller lists into new list in sorted order.

# make an array for each element ?

# use the merge algorithm to merge the smaller arrays to bigger arrays

# so afer the first process, you should have a bunch of arrays with 2 elements, sorted!

# but merge sort is O(n log n)

# merge sort needs additional space, it does not sort in place


# Merge sort keeps on dividing the list into equal halves until it can no more be divided

# Then merge sort combines smaller sorted lists keeping the new list sorted too.


#  two main functions − divide & merge.


def merge_sort(array)
  if array.length <= 1  # 1 element is already sorted!
    array
  else
    mid_index = (array.length / 2).floor # calculate mid_index
    left_array = merge_sort(array[0..mid_index - 1]) # get left side of the array
    right_array = merge_sort(array[mid_index..array.length]) # get right side of the array
    merge(left_array, right_array)
  end
end

def merge(left_array, right_array)
  if left_array.empty?
    right_array
  elsif right_array.empty?
    left_array
  elsif left_array.first < right_array.first
    [left_array.first] + merge(left_array[1..left_array.length], right_array)
  else
    [right_array.first] + merge(left_array, right_array[1..right_array.length])
  end
end

test = [3,5,9,4,7,0,2,8,6,1]
puts merge_sort(test)  # [0,1,2,3,4,5,6,7,8,9]
















