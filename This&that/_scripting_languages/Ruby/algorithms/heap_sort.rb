

def heapsort(array)
    # in pseudo-code, heapify only called once, so inline it here
    ((array.length - 2) / 2).downto(0) {|start| siftdown(array, start, array.length - 1)}

    # "end" is a ruby keyword
    (array.length - 1).downto(1) do |_end|
        array[_end], array[0] = array[0], array[_end]
        siftdown(array, 0, _end - 1)
    end
    array
end

def siftdown(array, start, _end)
    root = start
    loop do
        child = root * 2 + 1
        break if child > _end
        if child + 1 <= _end and array[child] < array[child + 1]
            child += 1
        end
        if array[root] < array[child]
            array[root], array[child] = array[child], array[root]
            root = child
        else
            break
        end
    end
end


array = [5,4,6,3,7,2,8,1,9,0]
heapsort(array)
p array  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
