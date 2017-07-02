# heap
# require 'pry' # for debugging

class Heap
    def initialize
        @size = 0
        @array = []
    end

    def parentIndex(i)
        # (10 - 1) / 2 is equal to 4.5
        # ruby already gives us the floor of (10 - 1) / 2, which is 4
        return (i - 1) / 2
    end

    def rightChildIndex(i)
        return i * 2 + 2
    end

    def leftChildIndex(i)
        return i * 2 + 1
    end

    def isLeaf(i)
        # (10 - 1) / 2 is equal to 4.5
        # ruby already gives us the floor of (10 - 1) / 2, which is 4
        return i >= @size / 2
    end

    def isIndexInBounds(i)
        return 0 <= i && i < @size # bug: return 0 <= i && i <= @size
    end

    def siftUp(i)
        pIndex = parentIndex(i)

        if isIndexInBounds(pIndex) && @array[i] < @array[pIndex]
            # swap
            @array[i], @array[pIndex] = @array[pIndex], @array[i]
           
            siftUp(pIndex)
        end
    end

    def siftDown(i)
        if isLeaf(i)
            return
        end

        rightChildIndex = rightChildIndex(i)
        leftChildIndex = leftChildIndex(i)
        smallest = leftChildIndex

        #puts "=================="
        #puts "parent @array[#{i}]: #{@array[i]}"
        #puts "L @array[#{leftChildIndex}]: #{@array[leftChildIndex]}"
        #puts "R @array[#{rightChildIndex}]: #{@array[rightChildIndex]}"

        # check if there is a right child
        # in ruby we cannot compare nil > number
        if isIndexInBounds(rightChildIndex) &&  @array[rightChildIndex] != nil && @array[rightChildIndex] <  @array[leftChildIndex]
            smallest = rightChildIndex
        end  

        if @array[i] != nil && @array[smallest] != nil && @array[i] > @array[smallest]
            # swap
            @array[i], @array[smallest] = @array[smallest], @array[i]

            siftDown(smallest);
        end
    end

    def push(data)
        # add to last index, siftUp

        nextIndex = @size
        @array[nextIndex] = data

        siftUp(@size)

        @size += 1
    end

    def pop
        # swap first and last, size--, siftDown top, return the pop

        if @size == 0
            return
        end

        firstVal = @array[0]
        lastIndex = @size - 1

        # swap
        @array[0], @array[lastIndex] = @array[lastIndex], @array[0]

        @array.pop

        siftDown(0)

        @size -= 1

        return firstVal
    end
   
    def peek
        return @array[0]
    end
end

heap = Heap.new

heap.push(3)
heap.push(4)
heap.push(7)

heap.pop # 3
heap.pop # 4
heap.pop # 7
heap.pop # nil
