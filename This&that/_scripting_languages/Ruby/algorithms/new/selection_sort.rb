
#
# iteration example for 5 elements
#
#  0 1 2 3 4
#  0 1 2 3
#  0 1 2
#  0 1
#  0
#
def selection_sort(array)
    array.each_with_index do |element, index|

        first_element_index = 0
        last_unsorted_index = array.size - index - 1
        index_with_highest_value = 0

        first_element_index.upto (last_unsorted_index) do |i|

            #
            # finding the largest element
            #
            if array[i] > array[index_with_highest_value]
                index_with_highest_value = i
            end
        end

        #
        # swap the index_with_highest_value with last_unsorted_index
        #
        temp = array[index_with_highest_value]
        array[index_with_highest_value] = array[last_unsorted_index]
        array[last_unsorted_index] = temp
    end
    return array
end

selection_sort [50,60,40,70,30,80,20,90,10]
#=> [10, 20, 30, 40, 50, 60, 70, 80, 90]
