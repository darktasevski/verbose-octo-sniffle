# Quick sort
# https://repl.it/languages/ruby
#
# Important, this way is the easier way, using the `wall_index`
#


#
# Since quick_sort is a recursive function, we need to pass the 
# `from_index` and `to_index`.
#
def quick_sort(array, from_index, to_index)

    # This is important, we dont want to have a `from_index` greater than the `to_index`
    if from_index < to_index 

        # Get the pivot_index (which is sorted), 
        # so we can sort the left and right sides of the array
        pivot_index = partition(array, from_index, to_index)

        # in these indexes, we will not include the pivot_index, since its sorted.
        quick_sort(array, from_index, pivot_index - 1)
        quick_sort(array, pivot_index + 1, to_index)
    end
end

#
# Helper function
# it returns the index of the pivot,
# at this point, that index is in the correct position
#
def partition(array, from_index, to_index)
    pivot_value = array[to_index]
    
    wall_index = from_index

    
    # From first to second to last
    from_index.upto(to_index - 1) do |current_index|
        if array[current_index] <= pivot_value
            
            # swap
            temp = array[wall_index]
            array[wall_index] = array[current_index]
            array[current_index] = temp
            
            # At this point, the first element, upto and including `wall_index`
            # are less than the `pivot_value`, and all elements 
            # after `wall_index` upto and including `current_index` are greater than the pivot

            # lets increment the `wall_index`
            wall_index += 1
        end
    end

    # At this point all elements before and NOT including `wall_index` are 
    # leseer than the `pivot_value`
    # And all elements after and including `wall_index` are greater than the `pivot_value`.

    # So swap  `wall_index` with the `to_index`.
    temp = array[wall_index]
    array[wall_index] = array[to_index]
    array[to_index] = temp

    # Now the pivot is in its correct position!

    # Return the index of the current pivot.
    return wall_index
end


array = [5,4,10,6,3,7,0,12,2,8,1,11,9]
quick_sort(array, 0, array.size - 1)
puts array
