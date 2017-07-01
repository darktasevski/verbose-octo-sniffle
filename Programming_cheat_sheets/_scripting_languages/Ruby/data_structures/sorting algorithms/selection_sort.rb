# Im not sure if it is correct

def selection_sort(array, n)
    for(i = 0; i < n - 1; i += 1)
        iMin = i
        for(j = i + 1; j < n ; j += 1)
            iMin = j if array[j] < array[iMin]
        end
        temp = array[i]
        array[i] = array[iMin]
        array[iMin] = temp
    end
end

def main
    array = [1,5,3,7]
    selection_sort(array, 4)

    for(i = 0; i < 3; i += 1)
        print "#{array[i]} "
    end
end