def radixSort(array)
    temp = []
    result = []

    array.each do |x|
        if temp[x] == nil
            temp[x] = 1
        else
            temp[x] = temp[x] + 1
        end
    end

    temp.each_with_index do |x, i|
        if (x)
            x.times do
                puts i
                result.push(i)
            end
        end
    end
    
    return result
end

array = [5,4,6,3,7,2,8,1,9,0]
radixSort(array)  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

p array
