# Im not sure its correct

def merge_sort(array)
    n = array.length
    return if n < 2
    mid = n / 2
    left_array = Array.new(mid)
    right_array = Array.new(n - mid)

    (0..(mid - 1)).to_a.each do |i|
        left_array[i] = array[i]
    end


    (mid..(n - 1)).to_a.each do
        right_array[i - mid] = array[i]
    end

    merge_sort(left_array)
    merge_sort(right_array)
    merge(left_array, right_array, array)
end


def merge()
    while i < nL and j < nR do
        if l[i] <= r[j]
            a[k] = l[i]
            i = i + 1
        else
            a[k] = r[i]
            j = j + 1
        end
        k = k + 1
    end

    while i < nL do
        a[k] = l[i]
        i = i + 1
        k = k + 1
    end

    while J < nR do
        a[k] = r[i]
        j = j + 1
        k = k + 1
    end

end