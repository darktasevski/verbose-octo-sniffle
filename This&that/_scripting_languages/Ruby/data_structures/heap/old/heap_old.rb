#   NOT FINISHED

# heap



# as a tree or array

# fill in this order : from top to bottom, left to right



# max heap, min heap


# insertion -> insert in the lower left-most spot
    # then swap recursively with parent if needed



# remove (usually the root )-> swap the  lower left-most item with the item that was removed
    # swap with children as needed


#   heap - from tree to array -> add in order -> from top to bottom, left to right




# array structure algorithms

def find_child(index)
    2 * index + 1  # left child
    2 * index + 1  # right child
end


def find_parent_index(index)
    parent_index = (index - 1) / 2  # the '/' operator gives us the 'floor'
    parent_index >= 0 ? parent_index : nil
end


@array = []

def insert(data)
    @array << data
    current_index = @array.size - 1
    # puts "inserting #{data} in index #{current_index}"
    # puts "\t parent of #{data} is #{@array[find_parent_index(current_index)]}" if find_parent_index(current_index) != nil

    while find_parent_index(current_index) != nil

        if @array[current_index] < @array[ find_parent_index(current_index) ]
            # puts "\t\t swap #{@array[current_index]} with #{@array[ find_parent_index(current_index) ]}"
            temp = @array[current_index]
            @array[current_index] = @array[ find_parent_index(current_index) ]
            @array[ find_parent_index(current_index) ] = temp
        end
        current_index = find_parent_index(current_index)

    end

end

#-----------------

def insert_b(index)
 while
end

end



insert 10
# insert 9
insert 8
insert 7
insert 6

insert 100
insert 200
insert 65
insert 1



def print_array(array)
    puts
    print "|"
    array.each_with_index do |item, i|
        print "#{i}\t\t|"
    end
    puts
    print "|"
    array.each_with_index do |item, i|
        print "#{item}\t\t|"
    end
    puts
    puts
end

print_array @array

