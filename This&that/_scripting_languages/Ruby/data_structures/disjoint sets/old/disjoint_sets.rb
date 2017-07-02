 # https://en.wikipedia.org/wiki/Disjoint-set_data_structure

=begin
    the Disjoint data structure, or UnionFind has basically three operations:
    - union (put two elements in the same set)
    - find (find in which set the element is in)

    - makeSet (makes a Set, and makes the element it's representative)
    
    - the parent array is to identify the elements parent
    - the rank array is to keep track which Set is larger for optimization in the union function
    
    # reflexive: A is connected to A # to itself
    # symmetric: if A is connected to B, then, vice-versa
    # transitive: if A -> B -> C, then A -> C
    # connected components:  the group
    # implementation: make a class and feed it with the number of elements, ex: UnionFind(10)

=end
#-----------------------------------------------------------
parent = []
rank = []

class UnionFind

    #
    # Makes a Set with the element as its representative
    # @param parent {Array} - the parent array
    # @param rank {Array} - the rank array
    # @param x {Integer} - a integer representing an element
    #
    def self.makeSet(parent, rank, x)
        parent[x] = x
        rank[x] = 0
    end

    #
    # Joins two element in the same set, if they are not already
    # @param parent {Array} - the parent array
    # @param rank {Array} - the rank array
    # @param x {Integer} - a integer representing an element
    # @param y {Integer} - a integer representing an element
    #
    def self.union(parent, rank, x, y)
        xRoot = self.find(parent, x)
        yRoot = self.find(parent, y)
        if xRoot == yRoot
            return
        end

        # x and y are not already in same set. Merge them.
        if rank[xRoot] < rank[yRoot]
            parent[xRoot] = yRoot
        elsif rank[xRoot] > rank[yRoot]
            parent[yRoot] = xRoot
        else
            parent[yRoot] = xRoot
            rank[xRoot] = rank[xRoot] + 1
        end
    end

    #
    # Finds out in what Set the element is in (and performs path compression)
    # @param parent {Array} - the parent array
    # @param x {Integer} - a integer representing an element
    # @return {Integer} - the representative element of the Set
    #
    def self.find(parent, x)
        if parent[x] != x
            parent[x] = self.find(parent, parent[x])
        end
        return parent[x]
    end
end

#--------------------------------------------------------------

# creating a Set out of each element
10.times do |n|
    UnionFind::makeSet(parent, rank, n)
end

UnionFind::find(parent, 7) # 7
UnionFind::union(parent, rank, 5, 7)
UnionFind::find(parent, 7) # 5
