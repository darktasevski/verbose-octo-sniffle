#
# Iteration example for 5 elements
#
# 0 1 2 3 4
# 0 1 2 3
# 0 1 2
# 0 1 
# 0  
#
def bubble_sort(array)
    #
    # We need the index to calculate the last element that is NOT not sorted, 
    # that is NOT in its correct position
    #
    array.each_with_index do |element, index|

        was_swapped = false
        second_element_index = 1
        last_unsorted_index = array.size - index - 1

        second_element_index.upto last_unsorted_index do |i|
            index_a = i - 1
            index_b = i
            if array[index_a] > array[index_b]
                
                #swap
                temp = array[index_b]
                array[index_b] = array[index_a]
                array[index_a] = temp

                was_swapped = true
            end
        end

        if was_swapped == false
            break
        end
    end

    return array
end

bubble_sort [50,60,40,70,30,80,20,90,10]
#=> [10, 20, 30, 40, 50, 60, 70, 80, 90]

