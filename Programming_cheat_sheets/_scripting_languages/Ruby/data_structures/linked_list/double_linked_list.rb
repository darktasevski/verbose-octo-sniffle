# double linked list


class Node
	attr_accessor :key, :data, :prev, :next

	def initialize(key, value)
		@key = key
		@value = value
		@prev = nil
		@next = nil
	end
end


class DLL
	attr_accessor :head, :tail, :size

	def initialize
		@size = 0
	end

	def add_to_head(key, value)
		new_node = Node.new(key, value)

		if @size == 0
			@head = new_node
			@tail = new_node
		else
			# set up the new node
			new_node.prev = nil
			new_node.next = @head 

			@head.prev = new_node
			@head = new_node
		end

		@size += 1
	end

	def remove_from_head
		if @size == 0
			return
		else
			@head = @head.next
			@head.prev = nil
		end

		@size -= 1
	end

	def add_to_tail(key, value)
		new_node = Node.new(key, value)

		if @size == 0
			@tail = new_node
			@head = new_node
		else
			# set up the new node
			new_node.next = nil
			new_node.prev = @tail 

			@tail.next = new_node
			@tail = new_node
		end

		@size += 1
	end

	def remove_from_tail
		if @size == 0
			return
		else
			@tail = @tail.prev
			@tail.next = nil
		end

		@size -= 1
	end

	def print_list
		puts "---> list:"
		current_node = @head
		while current_node != nil
			puts current_node.key
			current_node = current_node.next
		end
	end

end



dll = DLL.new

dll.add_to_head(3, 'foo3')
dll.add_to_head(2, 'foo2')
dll.add_to_head(1, 'foo1')
dll.add_to_head(0, 'foo0')
dll.add_to_tail(4, 'foo4')
dll.add_to_tail(5, 'foo5')
dll.add_to_tail(6, 'foo6')
dll.remove_from_tail
dll.remove_from_head
dll.print_list # 1 2 3 4 5
