# Queue - Linked List implementation
class Queue
    attr_accessor :front, :rear # variables to store address of front and rear nodes. 

    class Node
        attr_accessor :data, :next
    end

    # To Enqueue an integer
    def enqueue(x)
        temp = Node.new
            
        temp.data = x
        temp.next = nil
        if @front == nil && @rear == nil
            @front = @rear = temp
            return
        end

        @rear.next = temp
        @rear = temp
    end

    # To Dequeue an integer.
    def dequeue
        temp = @front
        if @front == nil
            puts "Queue is Empty"
            return
        end

        if @front == @rear
            @front = @rear = nil
        else
            @front = @front.next
        end

        temp = nil
    end

    def front
        if @front == nil
            print "Queue is empty"
            return
        end
        return @front.data
    end

    def printQueue
        temp = @front
        while temp != nil do
            print "#{temp.data} "
            temp = temp.next
        end
    end
end

# print elements in Queue 
queue = Queue.new
queue.enqueue(1) # 1
queue.enqueue(2) # 1 2
queue.enqueue(3) # 1 2 3
queue.enqueue(4) # 1 2 3 4
queue.printQueue # 1 2 3 4
queue.dequeue # 2 3 4
queue.enqueue(5) # 2 3 4 5
queue.printQueue # 2 3 4 5
