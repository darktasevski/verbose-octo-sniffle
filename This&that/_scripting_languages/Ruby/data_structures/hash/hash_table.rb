# Hash table

class Node
    attr_accessor :key, :value, :next
    def initialize(key, value)
        @key = key
        @value = value
        @next = nil
    end
end


class HashTable
    attr_accessor :size, :array

    def initialize(size)
        @size = size
        @array = []
        
        @size.times do |i| # index is zero based
            @array[i] = nil
        end
    end

    def hashFunction(key)
        hashed_value = 0
        i = 0
        big_number = 999999999 # 4611686018427387903 # 4294967295

        # Convert our string to an integer 
        while(hashed_value < big_number && i < key.size)
            asciiVal = key[i].ord  #  .ord is the same as key.charCodeAt(0) in javascript
            hashed_value = hashed_value * 256 # same as `hashed_value << 8`
            
            hashed_value += asciiVal
            i += 1
        end

        return hashed_value % @size
    end

    def createNode(key, value)
        return Node.new(key, value)
    end

    def insert(key, value)
        index = hashFunction(key)
        key_found = false

        current_node = @array[index]

        if current_node == nil
            # no node here, so add it
            new_node = createNode(key, value)
            @array[index] = new_node
            return
        else
            # find key, or last node
            while(current_node != nil)
                last_node = current_node # at the end of the iteration, we will have the last node.

                if current_node.key == key
                    current_node.value = value
                    key_found = true
                    break # exit the loop
                end
                
                current_node = current_node.next # continue with next node.
            end

            # If a key was not found, we create a node and add it to the end of the linked list
            if key_found == false
                new_node = createNode(key, value)
                last_node.next = new_node
            end

        end
    end

    def get(key)
        index = hashFunction(key)
        current_node = @array[index]

        # Go throught the nodes, trying to find our key
        while current_node != nil
            if current_node.key == key
                return current_node.value
            end
            current_node = current_node.next
        end
    end

    def print_array
        @array.each_with_index do |node, i|
            if node
                print "#{i} -> "

                current_node = node 
                while current_node
                    print "(#{current_node.key}, #{current_node.value}) -> "
                    current_node = current_node.next
                end

                print "\n"
            else
                puts "#{i} -"
            end
        end
        
    end
end


ht = HashTable.new(10)


ht.insert("name", "brian")
ht.insert("name", "brian1")
ht.insert("name", "brian2")
ht.insert("name", "brian3")

ht.insert("foo", "FOO")
ht.insert("bar", "BAR")
ht.insert("baz", "BAZ")
ht.insert("qux", "QUX")

ht.insert("age", 28)
ht.insert("address", "foobar 123 st")
ht.insert("phone", "555-555-5555")
ht.insert(10, 101010)

puts ht.get("name") # 'brian3'
puts ht.get("foo") # 'FOO'
puts ht.get("bar") # 'BAR'
puts ht.get("baz") # 'BAZ'
puts ht.get("qux") # 'QUX'

puts ht.get("age") # 28
puts ht.get("address") # "foobar 123 st"
puts ht.get("phone") # "555-555-5555"
puts ht.get(10) # 101010

puts ht.get("non_existant") # nil

ht.print_array

#
# OUTPUT
# 
# 0 -> (qux, QUX) -> 
# 1 -> (age, 28) -> 
# 2 -> (baz, BAZ) -> (phone, 555-555-5555) -> (10, 101010) -> 
# 3 -
# 4 -> (bar, BAR) -> 
# 5 -
# 6 -> (address, foobar 123 st) -> 
# 7 -> (name, brian3) -> 
# 8 -
# 9 -> (foo, FOO) -> 
# 
