# rbt


=begin 

Rules of Red Black Trees (not in any particular order):
1. Every node is either RED or BLACK
2. The root node is BLACK
3. Every leaf node (null) is BLACK
4. Every RED node has two BLACK child nodes
5. Every path from node x to a leaf node has the same number of BLACK nodes (BLACK height)

VIOLATIONS and SOLUTIONS:
Case 1:
1. Uncle is Red

Solution for Case 1:
1. Swap colors of Parent, Uncle, and Grandparent
2. Grandparent becomes the new node to check for violations

Case 2:
1. Uncle is Black
2a. Node is a Left Child of a Right Child
2b. Node is a Right Child of a Left Child

Solution for Case 2:
1a. Right rotate around Parent for 2a = Case 3
1b. Left rotate around Parent for 2b = Case 3
2. Parent becomes the new node to check for violations

Case 3:
1. Uncle is Black
2a. Node is a Right Child of a Right Child
2b. Node is a Left Child of a Left Child

Solution for Case 3:
1a. Left rotate around Grandparent for 2a
1b. Right rotate around Grandparent for 2b
2. Swap colors of Parent and Grandparent
3. Grandparent becomes the new node to check for violations

INSERTION
To insert a node, you begin at the root of the tree, 
and follow the rules of a Binary Search Tree, 
to insert the new node. The only difference is that 
you have to give the node a starting color (RED) 
and then after the insertion, check for violations (as described above).

DELETION
To delete a node, you follow the rules of deletion for 
Binary Search Trees. There are three scenarios:

Assuming we want to delete node x:
1. If node x has no children, then just delete node x.
2. If node x has one child, then replace node x with it's child, and delete node x.
3. If node x has two children, then replace node x with either its predecessor or successor, and delete node x.

For scenario 2 or 3 above, you would then check for violations at the node that replaced node x.


=end



class Node
    attr_accessor :key, :value, :color, :left, :right, :parent, :is_null

    def initialize(key, value)
        @key = key
        @value = value
        @color = nil
        @left = nil
        @right = nil
        @parent = nil
        @is_null = false
    end
end

class RedBlackTree
    attr_accessor :size, :root

    def initialize()
        @root = nil
        @size = 0
    end

    def create_node(key, value)

        # new node
        new_node = Node.new(key, value)
        new_node.color = :red

        # null left node
        nil_node_left = Node.new(nil, nil)
        nil_node_left.color = :black
        nil_node_left.is_null = true
        nil_node_left.parent = new_node

        # null right node
        nil_node_right = Node.new(nil, nil)
        nil_node_right.color = :black
        nil_node_right.is_null = true
        nil_node_right.parent = new_node

        new_node.right = nil_node_right
        new_node.left = nil_node_left

        return new_node
    end

    def insert(key, value)
        puts "========================== inserting: #{key}"
        new_node = create_node(key, value)

        # root is empty
        if @root == nil
            @root = new_node
            return
        end

        # root is not empty
        current_node = @root

        while true

            # puts "current_node.key: #{get_key(current_node)} current_node.is_null: #{current_node.is_null}"
            puts "current_node.key: #{get_key(current_node)}"

            if new_node.key > current_node.key
                if current_node.right == nil || current_node.right.is_null
                    current_node.right = new_node
                    new_node.parent = current_node # attach parent
                    break
                else
                    current_node = current_node.right
                    next
                end
            else
                if current_node.left == nil || current_node.left.is_null
                    current_node.left = new_node
                    new_node.parent = current_node # attach parent
                    break
                else
                    current_node = current_node.left
                    next
                end
            end
        end

        # new_node is the node we just inserted
        fix_possible_violations(new_node)
    end

    def fix_possible_violations(node)
        puts " -> fix_possible_violations"
        x = 0

        # paint root black
        @root.color = :black

        current_node = node

        puts "  START: WHILE LOOP"

        while current_node != nil do 
            x += 1
            if x > 10
                puts "---------------------------- STOP INFINIT LOOP!"
                break
            end

            if current_node.parent != nil 

                puts " -> current_node: #{get_key(current_node)}"

                # current_node has a parent
                parent = current_node.parent

                if parent.parent != nil 
                    # current_node has a grand_parent
                    g = parent.parent

                    # get uncle
                    if parent == g.right
                        u = g.left
                    else
                        u = g.right
                    end


                    # uncle is available

                    if u.color == :red 
                        puts ' -> CASE 1'
                        puts " -> u is red"
                        # puts u.color
                        # Case 1:
                        # 1. Uncle is Red
                        # Solution for Case 1:
                        # 1. Swap colors of Parent, Uncle, and Grandparent
                        # 2. Grandparent becomes the new node to check for violations
                        puts "     -> swap colors of p u g"
                        swap_color(parent)
                        swap_color(u)
                        swap_color(g)
                        current_node = g
                        puts "     -> current_node: #{get_key(current_node)} **"

                        next
                    elsif u.color == :black
                        puts ' -> CASE 2'
                        puts " -> u is black"
                        # puts u.color
                        #
                        # Case 2:
                        # 1. u is Black
                        # 2a. Node is a Left Child of a Right Child
                        # 2b. Node is a Right Child of a Left Child

                        # Solution for Case 2:
                        # 1a. Right rotate around Parent for 2a = Case 3
                        # 1b. Left rotate around Parent for 2b = Case 3
                        # 2. Parent becomes the new node to check for violations
                        if current_node == parent.left
                            # current_node is a left child

                            if parent == g.right
                                # current_node is a left child of a right child

                                # puts ' -> CASE 2'
                                # puts " -> u is black"
                                puts "     -> node is LR child"

                                # 2a.
                                parent = right_rotate(parent)
                                puts "     -> current_node: #{get_key(current_node)} *"

                                puts "     -> CASE 3"
                                swap_color(parent)
                                swap_color(parent.parent) 

                                # has gg ?
                                if parent.parent.parent != nil
                                    if parent.parent.parent.is_null == false  
                                        if parent.parent == parent.parent.parent.right 
                                            parent.parent.parent.right = left_rotate(parent.parent)
                                            current_node = parent.parent.parent.right
                                            puts "     -> current_node: #{get_key(current_node)}"
                                            next
                                        elsif parent.parent == parent.parent.parent.left 
                                            parent.parent.parent.left  = left_rotate(parent.parent)
                                            current_node = parent.parent.parent.left 
                                            puts "     -> current_node: #{get_key(current_node)}"
                                            next
                                        else
                                            puts "FATAL ERROR G IS NOR L OR R CHILD"
                                        end
                                    else
                                        parent = left_rotate(parent.parent)
                                        current_node = parent
                                        puts "     -> current_node: #{get_key(current_node)}"
                                        next
                                    end
                                end

                                    

                               
                            else
                                # current_node is a left child of a left child
                                puts "     -> node is LL child"
                                puts "     -> CASE 3"
                                swap_color(parent)
                                swap_color(parent.parent)

                                # has gg ?
                                if parent.parent.parent != nil
                                    if parent.parent.parent.is_null == false  
                                        if parent.parent == parent.parent.parent.right 
                                            parent.parent.parent.right  = right_rotate(parent.parent)
                                            current_node = parent.parent.parent.right 
                                            puts "     -> current_node: #{get_key(current_node)}"
                                            next
                                        elsif parent.parent == parent.parent.parent.left 
                                            parent.parent.parent.left  = right_rotate(parent.parent)
                                            current_node = parent.parent.parent.left 
                                            puts "     -> current_node: #{get_key(current_node)}"
                                            next
                                        else
                                            puts "FATAL ERROR G IS NOR L OR R CHILD"
                                        end
                                    else
                                        parent = right_rotate(parent.parent)
                                        current_node = parent
                                        puts "     -> current_node: #{get_key(current_node)}"
                                        next
                                    end
                                end

                                        

                            end
                        else
                            # current_node is a right child

                            if parent == g.right
                                # current_node is a right child of a right child
                                puts "     -> node is RR child"

                                puts "     -> CASE 3"
                                # g = parent.parent
                                swap_color(parent)
                                swap_color(parent.parent)

                                # has gg ?
                                if parent.parent.parent != nil
                                    if parent.parent.parent.is_null == false  
                                        puts
                                        puts
                                        puts "------------------------------------ #{parent.parent.parent.key}"
                                        if parent.parent == parent.parent.parent.right 
                                            parent.parent.parent.right  = left_rotate(parent.parent)
                                            current_node = parent.parent.parent.right 
                                            puts "     -> current_node: #{get_key(current_node)}"
                                            next
                                        elsif parent.parent == parent.parent.parent.left 
                                            parent.parent.parent.left  = left_rotate(parent.parent)
                                            current_node = parent.parent.parent.left 
                                            puts "     -> current_node: #{get_key(current_node)}"
                                            next
                                        else
                                            puts "FATAL ERROR G IS NOR L OR R CHILD"
                                        end
                                    else
                                        parent = left_rotate(parent.parent)
                                        current_node = parent
                                        puts "     -> current_node: #{get_key(current_node)}"
                                        next
                                    end
                                end

                                        

                            else
                                # current_node is a right child of a left child

                                # puts ' -> CASE 2'
                                # puts " -> u is black"
                                puts "     -> node is RL child"
                                # 2b.
                                parent = left_rotate(parent)
                                puts "     -> current_node: #{get_key(current_node)} *"

                                puts "     -> CASE 3"
                                swap_color(parent)
                                swap_color(parent.parent)

                                # has gg ?
                                if parent.parent.parent != nil
                                    if parent.parent.parent.is_null == false      
                                        if parent.parent == parent.parent.parent.right 
                                            parent.parent.parent.right = right_rotate(parent.parent)
                                            current_node = parent.parent.parent.right
                                            puts "     -> current_node: #{get_key(current_node)}"
                                            next
                                        elsif parent.parent == parent.parent.parent.left 
                                            parent.parent.parent.left = right_rotate(parent.parent)
                                            current_node = parent.parent.parent.left
                                            puts "     -> current_node: #{get_key(current_node)}"
                                            next
                                        else
                                            puts "FATAL ERROR G IS NOR L OR R CHILD"
                                        end
                                    else
                                        parent = right_rotate(parent.parent)
                                        current_node = parent
                                        puts "     -> current_node: #{get_key(current_node)}"
                                        next
                                    end
                                end

                                        
                            end
                        end

                    else
                        puts "FATAL ERROR: UNCLE HAS NO COLOR"
                    end

                else
                    # current_node does not have a grand_parent
                    g = nil
                    puts "NO G PARENT"
                    break
                end
            else
                # current_node does not have a parent
                parent = nil
                puts "NO PARENT, is root??? lets say it is"
                current_node.color = :black
                @root = current_node

                break
            end

        end

        puts "  END: WHILE LOOP"

    end

    def get_key(node)
        if node != nil 
            return node.key
        else
            return "<NIL>"
        end
    end

    def swap_color(node)
        if node != nil
            if node.color == :red 
                node.color = :black 
            else
                node.color = :red 
            end
        end
    end

    def in_order
        puts "========== in_order"
      in_order_recursively(@root)
    end

    
    def in_order_recursively(node)
        if node != nil && node.is_null == false
            in_order_recursively(node.left)
            print "Node: #{node.key} \n"
            in_order_recursively(node.right)
        end
    end

    #
    # usage:
    #    rbt.root.left = rbt.left_rotate(rbt.root.left)
    #
    def left_rotate(node)
        parent = node.parent
        x = node 
        y = node.right
        z = y.left

        # update pointers
        x.right = z 
        y.left = x

        # update parents
        y.parent = parent
        x.parent = y
        z.parent = x

        return y
    end

    #
    # usage:
    #    rbt.root.right = rbt.left_rotate(rbt.root.right)
    #
    def right_rotate(node)
        parent = node.parent
        x = node 
        y = node.left
        z = y.right

        # update pointers
        x.left = z 
        y.right = x

        # update parents
        y.parent = parent
        x.parent = y
        z.parent = x

        return y
    end



end



rbt = RedBlackTree.new 

rbt.insert(10, "brian")
rbt.insert(20, "brian")
rbt.insert(30, "brian")
rbt.insert(40, "brian")
rbt.insert(50, "brian")
rbt.insert(60, "brian")
rbt.insert(70, "brian")


# rbt.root = rbt.left_rotate(rbt.root)
rbt.in_order




# puts "====== local"
# puts "root.parent: #{rbt.root.parent}"
# puts "root: #{rbt.root.key}"
# puts "root.left: #{rbt.root.left.key}"
# puts "root.right: #{rbt.root.right.key}"


