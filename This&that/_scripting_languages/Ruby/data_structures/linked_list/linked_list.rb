# linked list
  # functions:
    # last_node_recursive
    # last_node_iterative
    # append_node_to_end
    # insert_last
    # add_node_to_front
    # print__in_order_iterative
    # print_in_order_recursive
    # delete_nth
    # print_recursive_inverse
    # reverse_iterative
    # reverse_recursive
    # traverse
    # insert_new_node_at_pos(data, pos)
    # delete_node_with(data)
    # update_node_with(data, new_data)
    # sort(head)
    #
    #
    #
    # find_node_in_pos
    # find_min
    # find_max
    # delete_first(data)
    # delete_all_with(data)

    # delete_all_nodes
    # get_nodes_count

# think of pointers as aliases!!!
class Node
    attr_accessor :data, :next

    def initialize(data)
        @data = data
    end
end

# pointer to head
@head = nil

def last_node_recursive(node)
    if node != nil
        if node.next != nil # if there is a next node, keep going!
            last_node_recursive(node.next)
        else # if there is not a next node, then you're it!
            node
        end
    end
end

def last_node_iterative(node)
    while node != nil and node.next != nil
        node = node.next
    end

    return node
end

def append_node_to_end(head, data)
    if head != nil
        new_node = Node.new(data)
        last_node_recursive(head).next = new_node
        return new_node
    else
        new_node = Node.new(data)
        @head = new_node
    end
end

def insert_last(node, data)
    if node == nil
        new_node = Node.new(data)    # note: new_node.next == null
        return new_node
    else
        node.next = insert_last(node.next, data)
        return node
    end
end

def add_node_to_front(head, data)
    new_node = Node.new(data)
    new_node.next = @head
    @head = new_node
    return new_node
end

def print__in_order_iterative(head)
    print "List is: "

    # loop through nodes
    while head != nil
        print "#{head.data} "
        head = head.next
    end
end

def print_in_order_recursive(node)
    if node != nil
        print "#{node.data} "
        print_in_order_recursive(node.next)
    else
        #
    end
end

def delete_nth(node, n)
    # get prev and current
    current_node = node
    prev_node = nil
    # each node will be associated with a number
    for count in 1..n
        if current_node != nil
            if n == 1 # case: when deleting the head
                @head = current_node.next
                current_node = nil
            elsif count == n # found it!
                prev_node.next = current_node.next # re-wire, connect prev to next
                current_node = nil
            else # get ready for next iteration:
                prev_node = current_node # current_node will become prev of next iteration!
                current_node = current_node.next # next_node will become current_node of next iteration
            end
        end
    end
end

# def delete_nth_recursive(node, n, count = 0)
#     # delete_nth_recursive(node, n + 1)
#     current_node = node
#     prev_node = nil
#     count = 1
#     if n == 1
#         @head = current_node.next
#         current_node = nil
#     elsif count == n # found it!
#         prev_node.next = current_node.next # re-wire, connect prev to next
#         current_node = nil
#     else # get ready for next iteration:
#         prev_node = current_node # current_node will become prev of next iteration!
#         current_node = current_node.next # next_node will become current_node of next iteration
#         delete_nth_recursive(node, n, count = 0)
#     end
# end

# def ddelete_nth(head, n)
#     current_node = head     # starting point
#     puts "head: #{head.data}"
#     i = 0

#     # We keep track of what the previous node is.
#     previous_node = nil
#     # for(int i=0;i<n;i++)            # Traverse to the nth node
#     while i < n and current_node != nil do
#         previous_node = current_node;
#         current_node = current_node.next
#         puts "prev: #{previous_node}, current_node: #{current_node}"
#         n += 1
#     end

#     # current_node contains the nth element
#     # previous_node contains the (n-1)th element.
#     if n != 0 and current_node != nil   # Update (n-1)th node
#         previous_node.next = current_node.next
#     else        # Update the head node.
#         head = head.next
#         current_node = nil         # Delete the nth node
#     end

#     return head               # Return the modified linked list.

# end

# # def ddelete_nth(node, num)
# #     count = 0

# #     while count < num  do
# #        puts("loop: #{count}" )
# #        count +=1
# #     end
# # end





def print_recursive_inverse
    nil
end





def reverse_iterative
    nil
end


def reverse_recursive
    nil
end

# 1. Traversing a linked list.
def traverse
    nil
end



# 4. Inserting a new node to a specific position on the list
def insert_new_node_at_pos(data, pos)
    nil
end
# 5. Deleting a node from the list
def delete_node_with(data)
    nil
end
# 6. Updating a node in the list
def update_node_with(data, new_data)
    nil
end

def sort(head)
   nil
end

def find_node_in_pos
    nil
end


#-------------------------------


append_node_to_end(@head, 10)
append_node_to_end(@head, 20)
append_node_to_end(@head, 30)
append_node_to_end(@head, 40)



delete_nth(@head, 4)




# add_node_to_front(@head, 100)
# add_node_to_front(@head, 101)
# puts @head.data




print__in_order_iterative(@head)









