# hash table

class Entry
    attr_accessor :key, :value, :_next
    def initialize(key, value)
        @key = key
        @value = value
        @_next = nil
    end
end


class HashTable
    attr_accessor :size, :table

    def initialize(size)
        @size = size
        @table = []
        
        @size.times do |i|
            @table[i] = nil
        end
    end

    def strcmp(a, b)  
        if(a < b)
            return -1
        elsif(a > b)
            return 1
        else
            return 0
        end
    end

    def hashFunction(key)
        hashval = 0
        i = 0
        uLONG_MAX = 4611686018427387903 #4294967295

        # Convert our string to an integer 
        while(hashval < uLONG_MAX && i < key.size)
            hashval = hashval << 8 # like multiplying x by (2 to the power of 8  (256))
            asciiVal = key[i].ord  #  .ord is the same as key.charCodeAt(0) in javascript
            hashval += asciiVal
            i += 1
        end

        return hashval % @size
    end

    def createEntry(key, value)
        return Entry.new(key, value)
    end

    def insert(key, value)
        index = hashFunction(key)

        _next = @table[index]

        while(_next != nil && _next.key != nil && strcmp(key, _next.key) > 0)
            last = _next
            _next = _next._next
        end

        # There's already an entry.  Let's replace that string. 
        if(_next != nil && _next.key != nil && strcmp(key, _next.key) == 0)
            _next.value = nil
            _next.value = value

        # Nope, could't find it.  Time to grow an entry. 
        else
            newEntry = createEntry(key, value)

            # We're at the start of the linked list in this index. 
            if(_next == @table[index])
                newEntry._next = _next
                @table[index] = newEntry

            # We're at the end of the linked list in this index. 
            elsif(_next == nil)
                last._next = newEntry

            # We're in the middle of the list.
            else
                newEntry._next = _next
                last._next = newEntry
            end
        end
    end

    def get(key)
        index = hashFunction(key)

        # Step through the index, looking for our value. */
        entry = @table[index]
        while(entry != nil && entry.key != nil && strcmp(key, entry.key) > 0)
            entry = entry._next
        end

        # Did we actually find anything? */
        if(entry == nil || entry.key == nil || strcmp(key, entry.key) != 0)
            return nil
        else
            return entry.value
        end
    end
end


ht = HashTable.new(1024) # size needs to be a power of 2

ht.insert("name", "brian")
ht.insert("age", 28)
ht.insert("address", "foobar 123 st")
ht.insert("phone", "555-555-5555")
ht.insert(10, 101010)

puts ht.get("name") # 'brian'
puts ht.get("age") # 28
puts ht.get("address") # 'foobar 123 st'
puts ht.get("phone") # '555-555-5555'
puts ht.get(10) # 101010

