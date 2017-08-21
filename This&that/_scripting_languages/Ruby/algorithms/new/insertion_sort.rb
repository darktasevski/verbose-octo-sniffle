def insertion_sort(array)

    # We start with index 1 (the second element)
    1.upto (array.size - 1) do |index|
        element = array[index]
        prev_index = index - 1

        # find a spot to insert the unsorted element
        while element < array[prev_index] && prev_index >= 0

            # scootch the element to the right
            array[prev_index + 1] = array[prev_index]
            prev_index -= 1
        end

        # here the 'prev_index' is a element less than the 'element'
        # so 'prev_index + 1' is the spot to put the element
        array[prev_index + 1] = element
    end

    return array
end

insertion_sort [7,8,6,5,9,8,4,3,1,2,8,0]
#=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 9]
