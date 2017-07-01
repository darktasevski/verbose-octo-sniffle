### A program to demonstrate common Binary Heap Operations

# working

INT_MAX = 1000000000
INT_MIN = -1000000000
 
### A class for Min Heap
class MinHeap
     # @harr ### pointer to array of elements in heap
     # @capacity ### maximum possible size of min heap
     # @heap_size ### Current number of elements in min heap

    ### Constructor: Builds a heap from a given array a[] of given size
    def initialize( cap)
        @heap_size = 0
        @capacity = cap
        @harr = []
    end
 
    ### to heapify a subtree with root at given index
    #void MinHeapify(int)
 
    def parent(i)
        return (i - 1) / 2 
    end
 
    ### to get index of left child of node at index i
    def left( i)
        return ( 2 * i + 1) 
    end
 
    ### to get index of right child of node at index i
    def right( i) 
        return ( 2 * i + 2)
    end
 
    ### to extract the root which is the minimum element
    # extractMin
 
    ### Decreases key value of key at index i to new_val
    #void decreaseKeyAtIndex( i,  new_val)
 
    ### Returns the minimum key (key at root) from min heap
    def getMin
        return @harr[0]
    end
 
    ### Deletes a key stored at index i
    #void deleteKeyAtIndex(i)
 
    ### Inserts a new key 'k'
    #void insertKey( k)

    ### Inserts a new key 'k'
    def insertKey(k)
        if @heap_size == @capacity
            puts "\nOverflow: Could not insertKey\n"
            return
        end
     
        ### First insert the new key at the end
        @heap_size += 1
        i = @heap_size - 1
        @harr[i] = k
     
        ### Fix the min heap property if it is violated
        while i != 0 && @harr[parent(i)] > @harr[i]
           #swap(@harr[i], @harr[parent(i)])
           temp = @harr[i]
           @harr[i] = @harr[parent(i)]
           @harr[parent(i)] = temp

           i = parent(i)
        end
    end

    ### Decreases value of key at index 'i' to new_val.  It is assumed that
    ### new_val is smaller than @harr[i].
    def decreaseKeyAtIndex( i,  new_val)
        @harr[i] = new_val
        while (i != 0 && @harr[parent(i)] > @harr[i])
           #swap(@harr[i], @harr[parent(i)])
           temp = @harr[i]
           @harr[i] = @harr[parent(i)]
           @harr[parent(i)] = temp

           i = parent(i)
        end
    end

    ### Method to remove minimum element (or root) from min heap
    def extractMin
        if @heap_size <= 0
            return INT_MAX
        end
        if @heap_size == 1
            @heap_size -= 1
            return @harr[0]
        end
     
        ### Store the minimum vakue, and remove it from heap
        root = @harr[0]
        @harr[0] = @harr[@heap_size - 1]
        @heap_size -= 1
        MinHeapify(0)
     
        return root
    end

    ### This function deletes key at index i. It first reduced value to minus
    ### infinite, then calls extractMin
    def deleteKeyAtIndex(i)
        decreaseKeyAtIndex(i, INT_MIN)
        extractMin
    end
     
    ### A recursive method to heapify a subtree with root at given index
    ### This method assumes that the subtrees are already heapified
    def MinHeapify(i)
         l = left(i)
         r = right(i)
         smallest = i
        if l < @heap_size && @harr[l] < @harr[i]
            smallest = l
        end
        if r < @heap_size && @harr[r] < @harr[smallest]
            smallest = r
        end
        if smallest != i
            #swap(@harr[i], @harr[smallest])
            temp = @harr[i]
            @harr[i] = @harr[smallest]
            @harr[smallest] = temp

            MinHeapify(smallest)
        end
    end
end

heap = MinHeap.new(11)
heap.insertKey(30)
heap.insertKey(20)
heap.insertKey(10)
puts heap.getMin # 10
heap.deleteKeyAtIndex(0)
puts heap.getMin # 20
puts heap.extractMin # 20
puts heap.getMin # 30
heap.decreaseKeyAtIndex(0, 29)
puts heap.getMin # 29

