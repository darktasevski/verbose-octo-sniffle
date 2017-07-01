# Dijkstra's algorithm

class Graph
    attr_accessor :size, :matrix

    INFINITY = Float::INFINITY

    def initialize(size)
        @size = size
        @matrix = []
        @dist = []
        @visited = []
        @nullValue = -1

        # initialize matrix
        size.times do |i|
            @matrix[i] = []
            size.times do |j|
                @matrix[i][j] = @nullValue
            end
        end
    end

    def connect(x, y, w)
        @matrix[x][y] = w
        @matrix[y][x] = w
    end

    def isConnected(x, y)
        @matrix[x][y] != @nullValue
    end

    #
    # Find the unvisited index in the dist array with the minimum distance value
    # this should be a minHeap...
    #
    def minDistance()
        currentMinValue = INFINITY
        indexWithMinDist = nil # indexWithMinDist = -100000 (old code)
        
        # Loop through the nodes
        @size.times do |i| 
            if  @visited[i] == false && 
                @dist[i] <= currentMinValue
                
                currentMinValue = @dist[i]
                indexWithMinDist = i
            end
        end
        return indexWithMinDist
    end

    #
    # print the distances from the nodes to the source
    #
    def printSolution()
        puts("Node Distance from Source\n")
        @size.times do |i|
            puts("#{i} \t\t #{@dist[i]}\n")
        end
    end

    #
    # Dijkstra's algorithm
    #
    def dijkstra(src)

        # Initialize @dist array and @visited array
        @size.times do |i| 
            @dist[i] = INFINITY # set all distances to INFINITY
            @visited[i] = false # indentify nodes as NOT @visited
        end

        # Distance of source node from itself is always 0
        @dist[src] = 0

        # Find shortest path for all nodes
        @size.times do
            # Pick node with the minimum distance to source, from the set of nodes not yet processed.
            # currentNode is always equal to src in first iteration.
            currentNode = minDistance()

            puts "CURRENT NODE: (i: #{currentNode}, dist: #{@dist[currentNode]}, visited: #{@visited[currentNode]}) \n"

            # Mark the picked node as processed
            @visited[currentNode] = true

            puts "CURRENT NODE: (i: #{currentNode}, dist: #{@dist[currentNode]}, visited: #{@visited[currentNode]}) \n\n"

            # Update dist value of the neighbor nodes of the currentNode.
            @size.times do |currentNeighbor|

                #
                # Update @dist[currentNeighbor] ONLY IF: 
                #
                # 1. the dist of currentNode is not INFINITY,
                # 2. there is an edge from currentNode to currentNeighbor (which means they are connected),
                # 3. currentNeighbor was NOT visited, 
                # 4. and total weight of path from src to currentNeighbor through currentNode is LESS 
                #    than current value of @dist[currentNeighbor]
                if  @dist[currentNode] != INFINITY &&
                    @matrix[currentNode][currentNeighbor] != @nullValue &&
                    @visited[currentNeighbor] == false &&
                    @dist[currentNode] + @matrix[currentNode][currentNeighbor] < @dist[currentNeighbor]

                    puts "\t\tCURRENT NEIGHBOR: (i: #{currentNeighbor}, dist: #{@dist[currentNeighbor]}, visited: #{@visited[currentNeighbor]}) \n"

                    @dist[currentNeighbor] = @dist[currentNode] + @matrix[currentNode][currentNeighbor]

                    puts "\t\tCURRENT NEIGHBOR: (i: #{currentNeighbor}, dist: #{@dist[currentNeighbor]}, visited: #{@visited[currentNeighbor]}) \n\n"
                end
            end
        end

        # print the constructed distance array
        printSolution()
    end

end

graph = Graph.new(3)

graph.connect(0, 1, 10)
graph.connect(0, 2, 100)
graph.connect(1, 2, 10)

graph.dijkstra(0)


#============================================================ OUTPUT:

# CURRENT NODE: (i: 0, dist: 0, visited: false) 
# CURRENT NODE: (i: 0, dist: 0, visited: true) 

#         CURRENT NEIGHBOR: (i: 1, dist: Infinity, visited: false) 
#         CURRENT NEIGHBOR: (i: 1, dist: 10, visited: false) 

#         CURRENT NEIGHBOR: (i: 2, dist: Infinity, visited: false) 
#         CURRENT NEIGHBOR: (i: 2, dist: 100, visited: false) 

# CURRENT NODE: (i: 1, dist: 10, visited: false) 
# CURRENT NODE: (i: 1, dist: 10, visited: true) 

#         CURRENT NEIGHBOR: (i: 2, dist: 100, visited: false) 
#         CURRENT NEIGHBOR: (i: 2, dist: 20, visited: false) 

# CURRENT NODE: (i: 2, dist: 20, visited: false) 
# CURRENT NODE: (i: 2, dist: 20, visited: true) 

# Node Distance from Source
# 0        0
# 1        10
# 2        20
