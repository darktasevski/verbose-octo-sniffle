# bubble sort

# you start in the second element of the array, walk the array, and keep swapping with the previous element.
#     doing that N times, N being the number of elements in the array
#     every loop the last index is closer to index 1 (the last index is subtracted by 1)
def bubbleSort(array)
    array.each_with_index do |e, j| # loop through all indexes

        # using this flag is an improvement to the function 
        # (the idea is that if you walk the whole indexes without swapping, 
        # this means that the array is sorted!)
        # so if the array is sorted, the function will only loop once!
        was_swapped = false  

        # be careful with parenthesis here...
        # a - b - c == (a - b) - c  
        # a - b - c != a - (b - c)
        1.upto( (array.length - j) - 1) do |i|  # indexes: 1 upto the last index (the first time), and each loop, the last index decreases.
            if array[i] < array[i - 1] # if element is less then its previous (thats why we start with the second element
                # swap in ruby:     a, b = b, a
                array[i], array[i - 1] = array[i - 1], array[i] 

                # part of the flag inprovement!
                was_swapped = true
            else
                #puts "------------ not swapped  #{j}  #{i}"
            end
        end

        # part of the flag inprovement!
        if was_swapped == false
            #puts "------------ its already sorted son!  #{j}"
            break  
        end
    end
    return array
end
array = [5, 4, 6, 3, 7, 2, 8, 1, 9, 0] # unsorted array
bubbleSort(array)  
print array # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# bubbleSort((1..5000).to_a) # 6 seconds

=begin if your array has 10 elements

---------------------- top iteration: 0
inner iteration: 1
inner iteration: 2
inner iteration: 3
inner iteration: 4
inner iteration: 5
inner iteration: 6
inner iteration: 7
inner iteration: 8
inner iteration: 9
---------------------- top iteration: 1
inner iteration: 1
inner iteration: 2
inner iteration: 3
inner iteration: 4
inner iteration: 5
inner iteration: 6
inner iteration: 7
inner iteration: 8
---------------------- top iteration: 2
inner iteration: 1
inner iteration: 2
inner iteration: 3
inner iteration: 4
inner iteration: 5
inner iteration: 6
inner iteration: 7
---------------------- top iteration: 3
inner iteration: 1
inner iteration: 2
inner iteration: 3
inner iteration: 4
inner iteration: 5
inner iteration: 6
---------------------- top iteration: 4
inner iteration: 1
inner iteration: 2
inner iteration: 3
inner iteration: 4
inner iteration: 5
---------------------- top iteration: 5
inner iteration: 1
inner iteration: 2
inner iteration: 3
inner iteration: 4
---------------------- top iteration: 6
inner iteration: 1
inner iteration: 2
inner iteration: 3
---------------------- top iteration: 7
inner iteration: 1
inner iteration: 2
---------------------- top iteration: 8
inner iteration: 1
---------------------- top iteration: 9
# no iteration here

=end
