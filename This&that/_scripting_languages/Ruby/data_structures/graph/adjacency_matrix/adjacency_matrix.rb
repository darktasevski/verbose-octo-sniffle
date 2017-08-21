#
# Graph - adjacency matrix
#
class Graph
  def initialize(size)
    @array = []

    @size = size

    @size.times do |i|
      @array[i] = []
    end
  end

  def connect(a, b, w)
    @array[a][b] = w
    @array[b][a] = w
  end

  def isConnected(a,b)
    return @array[a][b] != nil
  end


end

graph = Graph.new(10)

graph.connect(0, 1, 100)
graph.connect(0, 2, 100)
graph.connect(0, 3, 100)

graph.isConnected(0, 1) # true
graph.isConnected(0, 2) # true
graph.isConnected(0, 3) # true

graph.isConnected(0, 4) # false
