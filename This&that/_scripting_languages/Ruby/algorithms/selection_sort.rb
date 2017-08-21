
def selectionsort(array)
    for i in 0..(array.length - 2)
        min_index = i
        for j in (i+1)...(array.length)
            min_index = j  if array[j] < array[min_index]
        end
        array[i], array[min_index] = array[min_index], array[i]
    end
    array
end

ary = [7,6,5,9,8,4,3,1,2,0]
p selectionsort(ary)
# => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]