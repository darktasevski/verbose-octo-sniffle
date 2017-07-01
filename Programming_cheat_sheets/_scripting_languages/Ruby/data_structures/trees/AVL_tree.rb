#
# AVL tree
#

class Node
    attr_accessor :key,
                  :value,
                  :left,
                  :right,
                  :height

    def initialize(key, value)
        @key = key
        @value = value
        @left = nil
        @right = nil
        @height = 0
    end
end

class Tree
    attr_accessor :size,
                  :root

    def initialize
        @root = nil
        @size = 0
    end

    def insert(key, value)
        # Iterative insertion:
        #insertIteratively(@root, key, value)
        
        # Recursive insertion:
        @root = insertRecursively(@root, key, value)
        
        # this will not work because Ruby cannot pass arguments by reference
        # you cannot reassign a variable from inside a function, and have the results persist,
        # you can only update the value
        # insertRecursively(@root, key, value) 
    end
    
    def inOrder
      inOrderRecursively(@root)
    end

    private
    
    def inOrderRecursively(node)
        if node != nil
            inOrderRecursively(node.left)
            print "Node: #{node.key} \n\n"
            inOrderRecursively(node.right)
        end
    end

    def insertIteratively(root, key, value)

        if(@root == nil)
            @root = Node.new(key, value)
            return
        end

        currentNode = @root

        while true
            if key > currentNode.key
                if currentNode.right == nil
                    currentNode.right = Node.new(key, value)
                    break
                else
                    currentNode = currentNode.right
                end
            else
                if currentNode.left == nil
                    currentNode.left = Node.new(key, value)
                    break
                else
                    currentNode = currentNode.left
                end
            end
        end
    end

    #
    # Ruby does not pass by reference, so there is no way of inserting
    # recursively in an OOP way
    #
    def insertRecursively(currentNode, key, value)

        if currentNode == nil
            return Node.new(key, value)
        end

        if key > currentNode.key
            currentNode.right = insertRecursively(currentNode.right, key, value)
        else
            currentNode.left = insertRecursively(currentNode.left, key, value)
        end

        #======= AVL part

        # 2. Update height of this ancestor currentNode
        currentNode.height = max(height(currentNode.left), height(currentNode.right)) + 1

        # 3. Get the balance factor of this ancestor currentNode to check whether
        #   this currentNode became unbalanced
        balance = getBalance(currentNode)

        # If this currentNode becomes unbalanced, then there are 4 cases

        # Left Left Case
        if balance > 1 && key < currentNode.left.key
            puts "LL"
            return rightRotate(currentNode)
        end

        # Left Right Case
        if balance > 1 && key > currentNode.left.key
            puts "LR"
            currentNode.left =  leftRotate(currentNode.left)
            return rightRotate(currentNode)
        end

        # Right Right Case
        if balance < -1 && key > currentNode.right.key
            puts "RR"
            return leftRotate(currentNode)
        end

        # Right Left Case
        if balance < -1 && key < currentNode.right.key
            puts "RL"
            currentNode.right = rightRotate(currentNode.right)
            return leftRotate(currentNode)
        end

        puts "root from insert: #{root.key}"
        # return the (unchanged) currentNode pointer
        return currentNode
        #================
        # return currentNode
    end

    #
    # AVL stuff
    #

    def height(node)
        if node == nil
            return 0
        end

        return node.height
    end

    def max(a, b)
        return (a > b) ? a : b
    end

    def rightRotate(oldRoot)
        puts "right rotate #{oldRoot.key}"
        newRoot = oldRoot.left
        t2 = newRoot.right

        # Perform rotation
        newRoot.right = oldRoot
        oldRoot.left = t2

        # Update heights
        oldRoot.height = max(height(oldRoot.left), height(oldRoot.right)) + 1
        newRoot.height = max(height(newRoot.left), height(newRoot.right)) + 1

        # Return new root
        puts "new root from right rotate: #{newRoot.key}"
        return  newRoot
    end

    # A utility function to left rotate subtree rooted with x
    # See the diagram given above.
    def leftRotate(oldRoot)
        puts "left rotate #{oldRoot.key}"
        newRoot = oldRoot.right
        t2 = newRoot.left

        # Perform rotation
        newRoot.left = oldRoot
        oldRoot.right = t2

        #  Update heights
        oldRoot.height = max(height(oldRoot.left), height(oldRoot.right)) + 1
        newRoot.height = max(height(newRoot.left), height(newRoot.right)) + 1

        # Return new root
        puts "new root from left rotate: #{newRoot.key}"
        return newRoot
    end

    def getBalance(node)
        if node == nil
            return 0
        end

        return height(node.left) - height(node.right)
    end

end

t = Tree.new

t.insert(1, 100)
t.insert(2, 200)
t.insert(3, 300)
t.insert(4, 400)
t.insert(5, 500)
t.insert(6, 600)
t.insert(7, 700)
t.insert(8, 800)
t.insert(9, 900)
t.insert(10, 1000)
t.insert(11, 1100)

t.inOrder


=begin (RESULT TREE)

                4
            /       \
           2         8
         /   \      /  \ 
        1     3    6    9      
              /\        /\    
             5  7        10
                         /\   
                           11

=end
