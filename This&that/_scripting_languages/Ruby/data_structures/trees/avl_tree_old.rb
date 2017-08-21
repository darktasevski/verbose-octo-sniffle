# AVL tree
  # functions:
    # print__in_order_iterative
    # print_in_order_recursive
    # traverse
    # delete_node_with(data)
    # update_node_with(data, new_data)
    # find_min
    # find_max
    # delete_all_with(data)
    # delete_all_nodes
    # get_nodes_count

# slower insertion and removal but faster retrieval.

# trees are better than hash-tables if you want ordering



# on the rotations you return the new root, and then attach it to a parent

# height is the number of edges to the deepest child. x.height = max(height(x.left), height(x.right)) + 1 # 1 is the edge from the parent to the child.

# balance of a node is calculated: height(node.left) - height(node.right)

class Node
    attr_accessor :data, :right, :left, :height

    def initialize(data)
        @data = data
        @right = nil
        @left = nil
        @height = 0
    end
end

class Tree
    attr_accessor :root
    def initialize(node)
        @root = node
    end

    # def insert(data)
    #     new_node = Node.new(data)
    #     current_root = @root
    #     if new_node.data >= current_root.data
    #         while current_root.right do
    #             current_root = current_root.right
    #         end
    #         current_root.right = new_node

    #     elsif new_node.data < current_root.data
    #         while current_root.left do
    #             current_root = current_root.left
    #         end
    #         current_root.left = new_node

    #     end
    # end

    def _insert(node, data)
        if node == nil
            node = Node.new(data)
        elsif data >= node.data
            node.right = _insert(node.right, data)
        else
            node.left = _insert(node.left, data)
        end
        return node
    end

    # def _print(node)
    #     _print node.left if node.left
    #     puts node.data
    #     _print node.right  if node.right
    # end

    def _search(node, data)
        if node == nil
            puts "Not found."
            return false
        elsif node.data == data
            puts "found #{data}"
            return node
        elsif data >= node.data
            return _search(node.right, data)
        else
            return _search(node.left, data)
        end
    end

    def _delete(node, data)
        if node == nil
            puts "node not found"
            return node
        elsif data > node.data
            node.right = _delete(node.right, data)
        elsif data < node.data
            node.left = _delete(node.left, data)
        else
            if node == nil.left and node == nil.right # case 1: no child
                puts "deleted #{node.data}"
                node = nil
            elsif node == nil.left # case 2: one child
                temp = node
                node = node.right
                puts "deleted #{temp.data}"
                temp = nil
            elsif node == nil.right # case 2: one child
                temp = node
                node = node.left
                puts "deleted #{temp.data}"
                temp = nil
            else  # case 3: two child
                temp = find_max(node.right)
                node.data = temp.data
                node.right = _delete(node.right, temp.data)
                puts "deleted #{node.data}"
            end
        end
        return node
    end

    def _find_max(node)
        return node.right if node.right
        _find_max(node.right)
    end

    # private

    def search(data)
        _search(@root, data)
    end

    # def print
    #     _print(root)
    # end

    def delete(data)
        _delete(@root, data)
    end

    def insert(data)
        _insert(@root, data)
    end

    def find_max(node)
        return node.right if node.right
        find_max(node.right)
    end

    #------------------------------------------------------ AVL stuff
        # http://www.geeksforgeeks.org/avl-tree-set-1-insertion/

    # A utility function to get height of the tree
    def height(node)
        if node == nil
            return 0
        end
        return node.height
    end

    # A utility function to get maximum of two integers
    def max(a, b)
        return (a > b) ? a : b  # it should really be max ? I guess
    end

    # Helper function that allocates a new node with the given key and
    #    NULL left and right pointers.
    def newNode(data)
        node = Node.new(data)
        return node
    end

    # A utility function to right rotate subtree rooted with y
    # See the diagram given above.
    def rightRotate(y)
        puts "right rotate #{y.data}"
        x = y.left
        t2 = x.right

        # Perform rotation
        x.right = y
        y.left = t2

        # Update heights
        y.height = max(height(y.left), height(y.right)) + 1
        x.height = max(height(x.left), height(x.right)) + 1

        # Return new root
        puts "new root from right rotate: #{x.data}"
        return @root = x
    end

    # A utility function to left rotate subtree rooted with x
    # See the diagram given above.
    def leftRotate(x)
        puts "left rotate #{x.data}"
        y = x.right
        t2 = y.left

        # Perform rotation
        y.left = x
        x.right = t2

        #  Update heights
        x.height = max(height(x.left), height(x.right)) + 1
        y.height = max(height(y.left), height(y.right)) + 1

        # Return new root
        puts "new root from left rotate: #{y.data}"
        return @root = y
    end

    # Get Balance factor of node
    def getBalance(node)
        if node == nil
            return 0
        end

        return height(node.left) - height(node.right)
    end

    def insertAVL(data)
        puts "inserting: #{data}"
        _insertAVL(@root, data)
    end

    def _insertAVL(node, data)
        # 1.  Perform the normal BST rotation
        if node == nil
            return newNode(data)
        end

        if data >= node.data
            node.right  = _insertAVL(node.right, data)
        else
            node.left = _insertAVL(node.left, data)
        end


        # 2. Update height of this ancestor node
        node.height = max(height(node.left), height(node.right)) + 1

        # 3. Get the balance factor of this ancestor node to check whether
        #   this node became unbalanced
        balance = getBalance(node)

        # If this node becomes unbalanced, then there are 4 cases

        # Left Left Case
        if balance > 1 and data < node.left.data
            puts "LL"
            return rightRotate(node)
        end

        # Right Right Case
        if balance < -1 and data > node.right.data
            puts "RR"
            return leftRotate(node)
        end

        # Left Right Case
        if balance > 1 and data > node.left.data
            puts "LR"
            node.left =  leftRotate(node.left)
            return rightRotate(node)
        end

        # Right Left Case
        if balance < -1 and data < node.right.data
            puts "RL"
            node.right = rightRotate(node.right)
            return leftRotate(node)
        end

        # should I update the root?
        # root = node
        puts "root from insert: #{root.data}"
        # return the (unchanged) node pointer
        return node
    end

    # A utility function to print preorder traversal of the tree.
    # The function also prints height of every node
    def preOrderDFS(node)
        if node
            puts node.data
            preOrderDFS(node.left)
            preOrderDFS(node.right)
        end
    end

    def inOrderDFS(node)
        if node
            inOrderDFS(node.left)
            puts node.data
            inOrderDFS(node.right)
        end
    end

    def postOrderDFS(node)
        if node
            postOrderDFS(node.left)
            postOrderDFS(node.right)
            puts node.data
        end
    end

    def searchBFS  # its a level order
        # you need a Queue
        # 1. enqueue node x
        # 2. pop node x
        # 3. enqueue nodes x's 2 children
        return if @root == nil
        queue = Queue.new
        queue.push(@root)
        while queue.size > 0  do
            current_node = queue.pop
            puts "#{current_node.data} "

            queue.push(current_node.left) if current_node.left != nil
            queue.push(current_node.right) if current_node.right != nil
        end
    end
    #------------------------------------------------------- AVL stuff end
end

=begin

a) Left Left Case

t1, t2, t3 and t4 are subtrees.
         z                                      y
        / \                                   /   \
       y   t4      Right Rotate (z)          x      z
      / \          - - - - - - - - .      /  \    /  \
     x   t3                               t1  t2  t3  t4
    / \
  t1   t2
b) Left Right Case

     z                               z                           x
    / \                            /   \                        /  \
   y   t4  Left Rotate (y)        x    t4  Right Rotate(z)    y      z
  / \      - - - - - - - - .    /  \      - - - - - - - .  / \    / \
t1   x                          y    t3                    t1  t2 t3  t4
    / \                        / \
  t2   t3                    t1   t2
c) Right Right Case

  z                                y
 /  \                            /   \
t1   y     Left Rotate(z)       z      x
    /  \   - - - - - - - .    / \    / \
   t2   x                     t1  t2 t3  t4
       / \
     t3  t4
d) Right Left Case

   z                            z                            x
  / \                          / \                          /  \
t1   y   Right Rotate (y)    t1   x      Left Rotate(z)   z      y
    / \  - - - - - - - - .     /  \   - - - - - - - .  / \    / \
   x   t4                      t2   y                  t1  t2  t3  t4
  / \                              /  \
t2   t3                           t3   t4

=end

#------------------------------------------------
node = Node.new(1)

tree = Tree.new(node)

root = tree.root

# 5.times do
#   tree.insertAVL(rand(1..101))
# end
# puts "-------------"
# tree.print
# puts "-------------"
# tree.search(11)
# puts "-------------"
# tree.delete(12)
# puts "-------------"







# Constructing tree given in the above figure */
# tree.insertAVL(10)
tree.insertAVL(2)
tree.insertAVL(3)
tree.insertAVL(4)
tree.insertAVL(5)
tree.insertAVL(6)
# tree.insertAVL(7)
# tree.insertAVL(8)


=begin
    The constructed AVL Tree would be
            4
           /  \
         2      5
        /  \     \
       1    3    6
=end

puts "In order traversal of the constructed AVL tree is"
tree.inOrderDFS(root) # print
puts 'BFS:'
tree.searchBFS

puts
puts "#{root.data}"






