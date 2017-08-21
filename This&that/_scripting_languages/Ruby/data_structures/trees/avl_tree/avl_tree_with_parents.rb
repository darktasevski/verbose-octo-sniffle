class Node
    attr_accessor :key, :left, :right, :height, :parent

    def initialize(key)
        @key = key
        @left = nil
        @right = nil
        @height = 1
        @parent = nil
    end

    def printLR
        print "----------------- node: N L R"
        puts @key
        puts @left.key if @left
        puts @right.key if @right
    end
end


class AVLTree
    attr_accessor :root

    def initialize
        @root = nil
    end

    # A utility function to print inOrder traversal of the tree.
    def _inOrder(node)
        if node != nil
            _inOrder(node.left)
            print "#{node.key} "
            _inOrder(node.right)
        end
    end

    def inOrder()
        _inOrder(@root)
    end

    def max(a, b)
        return (a > b) ? a : b
    end

    def height(node)
        if (node == nil)
            return 0
        end
 
        return node.height
    end

    def getBalance(node)
        if (node == nil)
            return 0
        end
 
        return height(node.left) - height(node.right)
    end

    def printNode(node)
        if node == nil
            return ". P(n/a) H0"
        else
            return "#{node.key} (P#{node.parent ? node.parent.key : '.'} H#{node.height})"
        end
        
    end

    # A utility function to right rotate subtree rooted with y
    # See the diagram given above.
    def rightRotate(node)
        grandParent = node.parent

        if(grandParent != nil)
            if(grandParent.right == node)
                direction = 'R'
            else
                direction = 'L'
            end
        else
            direction = nil
        end

        puts "            ->  rightRotate #{node.key}"
        newRoot = node.left
        t2 = newRoot.right
        t1 = newRoot.left
 
        # Perform rotation
        newRoot.right = node
        node.left = t2
 
        # Update heights
        node.height = max(height(node.left), height(node.right)) + 1
        newRoot.height = max(height(newRoot.left), height(newRoot.right)) + 1

        # update parents
        t2.parent = node if t2 != nil
        t1.parent = newRoot if t1 != nil
        newRoot.parent = grandParent
        node.parent = newRoot

        # update children
        newRoot.right = node
        newRoot.left = t1
        node.left = t2
        if(direction == 'R')
            grandParent.right = newRoot
        elsif(direction == 'L')
            grandParent.left = newRoot
        end

        # print
        puts
        puts "             #{printNode(newRoot)}"
        puts "          /           \\"
        puts "     #{printNode(newRoot.left)}       #{printNode(newRoot.right)}" 
        puts ""
        puts ""
        puts ""

        # Return new root
        return newRoot
    end
 
    # A utility function to left rotate subtree rooted with x
    # See the diagram given above.
    def leftRotate(node)
        grandParent = node.parent

        if(grandParent != nil)
            if(grandParent.right == node)
                direction = 'R'
            else
                direction = 'L'
            end
        else
            direction = nil
        end

        puts "            ->  leftRotate #{node.key}"
        newRoot = node.right
        t2 = newRoot.left
        t1 = newRoot.right
 
        # Perform rotation
        newRoot.left = node
        node.right = t2
 
        #  Update heights
        node.height = max(height(node.left), height(node.right)) + 1
        newRoot.height = max(height(newRoot.left), height(newRoot.right)) + 1

        # update parents
        t2.parent = node if t2 != nil
        t1.parent = newRoot if t1 != nil
        newRoot.parent = grandParent
        node.parent = newRoot

        # update children
        newRoot.left = node
        newRoot.right = t1
        node.right = t2
        if(direction == 'R')
            grandParent.right = newRoot
        elsif(direction == 'L')
            grandParent.left = newRoot
        end

        # print
        puts
        puts "             #{printNode(newRoot)}"
        puts "          /           \\"
        puts "     #{printNode(newRoot.left)}       #{printNode(newRoot.right)}" 
        puts ""
        puts ""
        puts ""
 
        # Return new root
        return newRoot
    end

    def insert(key)
        puts "========================================================= inserting #{key}"
        puts
        puts

        newNode = Node.new(key)

        if(@root == nil)
            puts "=> #{key} is now root!  P: #{newNode.parent} H: #{newNode.height}"
            @root = newNode
            return
        end

        currentNode = @root

        while(true)
            puts "=> currentNode: #{currentNode.key} H #{currentNode.height}"

            # if key is greater, and the slot is empty, insert newNode there
            if newNode.key > currentNode.key

                # puts "------------------------------ #{newNode.key} > #{currentNode.key}, so going right"
                if currentNode.right == nil

                    puts "    -> found a spot: #{currentNode.key}'s right = #{newNode.key}"
                    currentNode.right = newNode
                    newNode.parent = currentNode
                    break # exit the loop, we are done!
                else
                    currentNode = currentNode.right
                end
            else
                # puts "------------------------------ #{newNode.key} < #{currentNode.key}, so going left "
                if currentNode.left == nil
                    puts "    -> found a spot: #{currentNode.key}'s left = #{newNode.key}"
                    currentNode.left = newNode
                    newNode.parent = currentNode
                    break # exit the loop, we are done!
                else
                    currentNode = currentNode.left
                end
            end
        end

        currentParent = newNode.parent

        while(currentParent != nil)

            # 2. Update height of this ancestor parent
            currentParent.height = max(height(currentParent.left), height(currentParent.right)) + 1
     
            # 3. Get the balance factor of this ancestor
            # currentParent to check whether this currentParent became
            # unbalanced
            balance = getBalance(currentParent)

            puts "        -> (go up) P #{currentParent.key}, H: #{currentParent.height}, B: #{balance}"
     
            # If this currentParent becomes unbalanced, then there
            # are 4 cases:

            # Left Left Case
            if (balance > 1 && key < currentParent.left.key)
                puts "        -> #{currentParent.key} needs Rotation..."
                
                currentParent = rightRotate(currentParent)

                if(currentParent.parent == nil)
                    @root = currentParent
                else
                    #
                end
            end
     
            # Right Right Case
            if (balance < -1 && key > currentParent.right.key)
                puts "        -> #{currentParent.key} needs Rotation..."

                currentParent = leftRotate(currentParent)
                
                if(currentParent.parent == nil)
                    @root = currentParent
                else
                    #
                end
            end
     
            # Left Right Case
            if (currentParent.left != nil && balance > 1 && key > currentParent.left.key)
                puts "        -> #{currentParent.key} needs Rotation..."
                puts "            -> since its a LR case, we nned to go down to #{currentParent.left.key}"

                puts "------ before:"
                puts "        #{printNode(currentParent)}"
                puts "      /"
                puts "     #{printNode(currentParent.left)}"
                puts "       \\"
                puts "         #{printNode(currentParent.left.right)}"
                puts ""
                puts ""

                currentParent.left = leftRotate(currentParent.left)

                puts "------ after A:"
                puts "             #{printNode(currentParent)}"
                puts "           /"
                puts "          #{printNode(currentParent.left)}"
                puts "       /"
                puts "      #{printNode(currentParent.left.left)}"
                puts ""
                puts ""

                currentParent = rightRotate(currentParent)

                if(currentParent.parent == nil) 
                    @root = currentParent
                else
                    #
                end
            end
     
            # Right Left Case
            if (currentParent.right != nil && balance < -1 && key < currentParent.right.key)
                puts "        -> #{currentParent.key} needs Rotation..."
                puts "            -> since its a RL case, we need to go down to #{currentParent.right.key}"
                # puts "            -> ROTATING R(#{currentParent.right.key})"
                # puts "            -> ROTATING L(#{currentParent.key})"

                puts "------ before:"
                puts "        #{printNode(currentParent)}"
                puts "           \\"
                puts "             #{printNode(currentParent.right)}"
                puts "            /"
                puts "          #{printNode(currentParent.right.left)}"
                puts ""
                puts ""

                currentParent.right = rightRotate(currentParent.right)
                
                puts "------ after A:"
                puts "             #{printNode(currentParent)}"
                puts "               \\"
                puts "                #{printNode(currentParent.right)}"
                puts "                  \\"
                puts "                    #{printNode(currentParent.right.right)}"
                puts ""
                puts ""

                currentParent = leftRotate(currentParent)

                if(currentParent.parent == nil)
                    puts
                    puts "         #{currentParent.key}        "
                    puts "    /          \\"
                    puts "#{currentParent.left ? currentParent.left.key : currentParent.left}        #{currentParent.right ? currentParent.right.key : currentParent.right}"
                    puts
                    @root = currentParent
                else
                    #
                end
            end
     
            currentParent = currentParent.parent
        end
            
        puts "inOrder:"
        puts " #{inOrder}"
    end
end

#
# API
#

tree = AVLTree.new()

[8,14,1,7,12,15,2,6,3,11,5,4,0,13,9,10].each do |key|
    tree.insert(key)
end

#=> 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15  
