# QUICKSORT

def partition(array, low_index, hi_index)
    i = low_index 
    j = hi_index 
    pivot = array[low_index] # save value and index

    while true
       
        while array[i] < pivot
            i += 1
            break if i == hi_index
        end
        
        while array[j] > pivot
            j -= 1
            break if j == low_index
        end

        if i >= j
          break
        end

        # swap
        array[i], array[j] = array[j], array[i]
    end
    
    # not sure why we dont need this...
    # array[low_index], array[j] = array[j], array[low_index]
    
    return j  # the index that is already sorted!
end

def quick_sort(array, lo, hi)
  
    if hi <= lo
        return # base case
    end
    
    # j is the index that is already sorted,
    # so we just need to sort the left and right side  
    j = partition(array, lo, hi)
  
    # quicksort left side
    quick_sort(array, lo, j - 1)

    # quicksort right side
    quick_sort(array, j + 1, hi)
end


array = [60,50,70,40,80,30,90,20,0,10]

quick_sort(array, 0, 9)

puts array.inspect
#=> [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
