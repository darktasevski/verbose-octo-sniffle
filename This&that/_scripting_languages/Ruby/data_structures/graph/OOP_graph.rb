class Graph
    attr_accessor :vertecesCount , :adjacency_lists

    # A utility function that creates a graph with n vertices (createGraph)
    def initialize(vertecesCount)
        @vertecesCount = vertecesCount

        # Create an array of adjacency lists.  Size of array will be the vertecesCount
        @adjacency_lists = []  # (struct AdjList *) malloc(vertecesCount * sizeof(struct AdjList));

        # Initialize each adjacency list as empty by making head as nil
        vertecesCount.times do |i|
            adj_list = Graph::AdjList.new
            adj_list.head = nil
            @adjacency_lists[i] = adj_list
        end
    end

    # A class to represent an adjacency list node
    class AdjListNode
        attr_accessor :dest, :next
    end

    # A class to represent an adjacency list
    class AdjList
        attr_accessor :head  # pointer to head node of list
    end



    # A utility function to create a new adjacency list node
    def new_adj_list_node(dest)
        new_node = Graph::AdjListNode.new
        new_node.dest = dest
        new_node.next = nil
        return new_node
    end

    # Adds an edge to an undirected graph
    def addEdge(src, dest)
        # Add an edge from src to dest.  A new node is added to the adjacency
        # list of src.  The node is added at the begining
        new_node = new_adj_list_node(dest)
        new_node.next = @adjacency_lists[src].head
        @adjacency_lists[src].head = new_node

        # Since graph is undirected, add an edge from dest to src also
        new_node = new_adj_list_node(src)
        new_node.next = @adjacency_lists[dest].head
        @adjacency_lists[dest].head = new_node
    end

    # A utility function to print the adjacenncy list representation of graph
    def printGraph
        @adjacency_lists.each_with_index do |v, index|
            current_vertex = v.head
            print "\n Adjacency list of vertex #{index}\n head"
            while (current_vertex) do
                print " -> #{current_vertex.dest}"
                current_vertex = current_vertex.next
            end
            puts
        end
    end
end

#-------------------------------------------------------------------------

# create the graph
graph = Graph.new(5)
graph.addEdge(0, 1)
graph.addEdge(0, 4)
graph.addEdge(1, 2)
graph.addEdge(1, 3)
graph.addEdge(1, 4)
graph.addEdge(2, 3)
graph.addEdge(3, 4)

# print the adjacency list representation of the above graph
graph.printGraph



=begin  

    output:

    Adjacency list of vertex 0
    head -> 4 -> 1

    Adjacency list of vertex 1
    head -> 4 -> 3 -> 2 -> 0

    Adjacency list of vertex 2
    head -> 3 -> 1

    Adjacency list of vertex 3
    head -> 4 -> 2 -> 1

    Adjacency list of vertex 4
    head -> 3 -> 1 -> 0

=end
