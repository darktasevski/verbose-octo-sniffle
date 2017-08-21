#
# Graph
# adjacency list implementation
#
class Node
    attr_accessor :value, :next

    def initialize(value, weight)
        @value = value
        @weight = weight
        @next = nil
    end
end


class AdjList 
    attr_accessor :head, :tail
    def initialize
        @head = nil
        @tail = nil
    end

    # def find
    #     #
    # end

    # def remove
    #     #
    # end

    # def add
    #     #
    # end

    # def print
    #     #
    # end
end

class Graph
    # attr_reader :size, :array

    #
    # create an array of empty lists
    #
    def initialize(size)
        @size = size
        @array = []

        @size.times do |index|
            @array[index] = AdjList.new
        end
    end

    def add(x, y, w)
        newNode = Node.new(y, w)
        list = @array[x]
        currentNode = list.head
        prevNode = nil

        if currentNode == nil
            # the list is empty
            list.head = newNode
            list.tail = newNode
            return # beacause the list was empty, and we added a node... we are finished!
        end

        # check it the node already exists in the list
        while currentNode != nil
            prevNode = currentNode

            if currentNode.value == y
                return # because the node is already there.
            end
            currentNode = currentNode.next            
        end
        prevNode.next = newNode # prevNode.next (because the currentNode was null, so the prevNode should be valid! )
        list.tail = newNode
    end

    def remove(x, y)
        list = @array[x]
        currentNode = list.head
        prevNode = nil

        # empty list
        if currentNode == nil
            return # beacause the list was empty, the node is not there, we are finished!
        end

        # list with a single element
        if currentNode.next == nil
            currentNode = nil
            list.head = nil
            list.tail = nil

            return
        end


        # search for the node
        while currentNode != nil
            prevNode = currentNode

            if currentNode.value == y
                # remove node
                prevNode.next = currentNode.next
                currentNode = nil

                return # when we remove the node, we are done.
            end
            currentNode = currentNode.next
        end
    end

    def _print
        @size.times do |index|
            # @array[index].print()
            list = @array[index]
            currentNode = list.head
            print "(#{index}) -> "
            while currentNode
                print "#{currentNode.value} -> "
                currentNode = currentNode.next
            end

            puts ""
        end
    end
end


graph = Graph.new(10)

graph.add(1,2,100)
graph.add(1,3,200)
graph.add(1,4,300)
graph.add(1,5,400)
graph.add(2,3,500)

graph.remove(2,3)

graph._print


# output:
#
# (0) -> 
# (1) -> 2 -> 3 -> 4 -> 5 -> 
# (2) -> 
# (3) -> 
# (4) -> 
# (5) -> 
# (6) -> 
# (7) -> 
# (8) -> 
# (9) -> 
