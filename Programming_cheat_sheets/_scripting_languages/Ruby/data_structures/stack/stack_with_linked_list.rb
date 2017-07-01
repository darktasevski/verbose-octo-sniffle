# stack in linked list implementation


class Stack
    attr_accessor :size, :first

    def initialize
        @size = 0
    end

    class Node
        attr_accessor :value, :next
    end

    def push(value)
        current = @first
        @first = Node.new
        @first.value = value
        @first.next = current
        @size += 1
        return self
    end

    def pop
        if @first == nil 
            puts "Stack is empty"
        end
        value = @first.value
        @first = @first.next
        @size -= 1
        return value
    end

    def peek
        puts "#{@first.value}"
    end

    def toString
        str = ""
        tmp = @first
        while tmp != nil do
            str << "#{tmp.value} "
            tmp = tmp.next
        end
        return str
    end
end

stack = Stack.new
stack.push(10).push(20).push(30)
stack.size # 3
stack.peek # 30
stack.toString # 30 20 10
puts "#{stack.pop} #{stack.pop} #{stack.pop} " # 30 20 10
