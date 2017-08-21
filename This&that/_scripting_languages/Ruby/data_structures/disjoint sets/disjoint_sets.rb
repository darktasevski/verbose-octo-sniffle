#
# Disjoint sets (also called union-find algorithm)
# all elements start off with a -1 value
# the rank of a root is only incremented if the two roots have the same rank
# the rank is proportional to the height of the tree.
#
class DisjointSet
    attr_accessor :array, :size
    
    def initialize(size)
        @size = size
        @array = []
        @size.times do |index|
            @array[index] = -1
        end
    end

    def union(x, y)
        xP = find(x)
        yP = find(y)
        
        if xP == yP 
          return
        end
        
        # remember that negative numbers indicate the rank
        if @array[xP] < @array[yP] # in this case, xP has a greater rank!
            @array[y] = xP
        elsif @array[xP] > @array[yP] 
            @array[x] = yP
        elsif @array[xP] == @array[yP]
            @array[yP] = xP
            @array[xP] -= 1 # only in this case we increment the rank!
        end 
    end
    
    #
    # find the parent using path compression
    #
    def find(x)
        parent = @array[x]
        if parent < 0 # when its a negative value, indicating a 'rank'
            return x # return the parent, not the rank...
        end
        
        # path compression 
        # all children in the path will point directly to the root of the tree
        @array[x] = find(parent) 
        return @array[x]
    end

    def display
        @size.times do |index|
            puts "#{index} [#{@array[index]}]"
        end
    end
end

#
# API
#

set = DisjointSet.new(10)

set.union(1,2)
set.union(2,3)
set.union(3,4)
set.union(4,5)

set.find(1) # 1 (in group with '1' as representative)
set.find(2) # 1 (in group with '1' as representative)
set.find(3) # 1 (in group with '1' as representative)
set.find(4) # 1 (in group with '1' as representative)
set.find(5) # 1 (in group with '1' as representative)

set.find(6) # 6 (in group with '6' as representative)
set.find(7) # 7 (in group with '7' as representative)
set.find(8) # 8 (in group with '8' as representative)
set.find(9) # 9 (in group with '9' as representative)

set.display

# OUTPUT:
#
# 0 [-1]
# 1 [-2]
# 2 [1]
# 3 [1]
# 4 [1]
# 5 [1]
# 6 [-1]
# 7 [-1]
# 8 [-1]
# 9 [-1]
