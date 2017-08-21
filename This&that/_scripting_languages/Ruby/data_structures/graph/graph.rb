# http://www.geeksforgeeks.org/graph-and-its-representations/

=begin 
    A Ruby Program to demonstrate adjacency list representation of graphs
    - vertex, vertices are the nodes
    - edges are the connections between the nodes

    - there are directed, and undirected graphs
    - acyclic and cyclic graphs
=end

# A class to represent an adjacency list node
class AdjListNode
    attr_accessor :dest, :next
end

# A class to represent an adjacency list
class AdjList
    attr_accessor :head  # pointer to head node of list
end

# A class to represent a graph. A graph is an array of adjacency lists.
# Size of array will be for the number of vertices in graph
class Graph
    attr_accessor :vertecesCount , :adjacency_lists  #:adjacency_lists
end

# A utility function to create a new adjacency list node
def new_adj_list_node(dest)
    new_node = AdjListNode.new
    new_node.dest = dest
    new_node.next = nil
    return new_node
end

# A utility function that creates a graph with n vertices
def createGraph(vertecesCount)
    graph = Graph.new
    graph.vertecesCount = vertecesCount

    # Create an array of adjacency lists.  Size of array will be the vertecesCount
    graph.adjacency_lists = []  # (struct AdjList *) malloc(vertecesCount * sizeof(struct AdjList));

    # Initialize each adjacency list as empty by making head as nil
    vertecesCount.times do |i|
        adj_list = AdjList.new
        adj_list.head = nil
        graph.adjacency_lists[i] = adj_list
    end
    return graph
end

# Adds an edge to an undirected graph
def addEdge(graph, src, dest)
    # Add an edge from src to dest.  A new node is added to the adjacency
    # list of src.  The node is added at the begining
    new_node = new_adj_list_node(dest)
    new_node.next = graph.adjacency_lists[src].head
    graph.adjacency_lists[src].head = new_node

    # Since graph is undirected, add an edge from dest to src also
    new_node = new_adj_list_node(src)
    new_node.next = graph.adjacency_lists[dest].head
    graph.adjacency_lists[dest].head = new_node
end

# A utility function to print the adjacenncy list representation of graph
def printGraph(graph)
    graph.adjacency_lists.each_with_index do |v, index|
        current_vertex = v.head
        print "\n Adjacency list of vertex #{index}\n head"
        while (current_vertex) do
            print " -> #{current_vertex.dest}"
            current_vertex = current_vertex.next
        end
        puts
    end
end

#-------------------------------------------------------------------------

# create the graph
@graph = createGraph(5)
addEdge(@graph, 0, 1)
addEdge(@graph, 0, 4)
addEdge(@graph, 1, 2)
addEdge(@graph, 1, 3)
addEdge(@graph, 1, 4)
addEdge(@graph, 2, 3)
addEdge(@graph, 3, 4)

# print the adjacency list representation of the above graph
printGraph(@graph)

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
