# Shell sort needs insertion sort

def insertion_sort(array)
    1.upto(array.size - 1) do |i|
        value = array[i]
        hole = i
        while hole > 0 && array[hole - 1] > value
            array[hole] = array[hole - 1]
            hole -= 1
        end
        array[hole] = value
    end
    return array
end

def shell_sort(array)
    interval = array.size / 2
    lastIndex = array.size - 1
    while interval > 0
        0.upto(lastIndex) do |i|
            if i + interval < lastIndex && array[i] > array[i + interval]
                    
                # swap
                temp = array[i]
                array[i] = array[i + interval]
                array[i + interval] = temp     
            end
        end
        interval /= 2
    end

    # insertion sort
    insertion_sort(array)

    return array
end


shell_sort [90,80,70,60,100,50,40,30,20,10]
#=> [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

