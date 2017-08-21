### Ruby program for insertion in AVL Tree
# http://www.geeksforgeeks.org/avl-tree-set-1-insertion/

class Node
    attr_accessor :key, :height, :left, :right
 
    def initialize(d)
        @key = d
        @height = 1
    end
end
 
class AVLTree
    attr_accessor :root
     
    ### A utility function to get height of the tree
    def height(node)
        if node == nil
            return 0
        end
        return node.height
    end
 
    ### A utility function to get maximum of two integers
    def max(a, b)
        return (a > b) ? a : b
    end
 
    ### A utility function to right rotate subtree rooted with y
    ### See the diagram given above.
    def rightRotate(y)
        x = y.left
        t2 = x.right
 
        ### Perform rotation
        x.right = y
        y.left = t2
 
        ### Update heights
        y.height = max(height(y.left), height(y.right)) + 1
        x.height = max(height(x.left), height(x.right)) + 1
 
        ### Return new root
        return x
    end
 
    ### A utility function to left rotate subtree rooted with x
    ### See the diagram given above.
    def leftRotate(x)
        y = x.right
        t2 = y.left
 
        ### Perform rotation
        y.left = x
        x.right = t2
 
        ###  Update heights
        x.height = max(height(x.left), height(x.right)) + 1
        y.height = max(height(y.left), height(y.right)) + 1
 
        ### Return new root
        return y
    end
 
    ### Get Balance factor of node N
    def getBalance(node)
        if node == nil
            return 0
        end
        return height(node.left) - height(node.right)
    end
 
    def insert(node, key)
         
        #### 1.  Perform the normal BST rotation 
        if node == nil
            return Node.new(key)
        end
 
        if key < node.key
            node.left = insert(node.left, key)
        else
            node.right = insert(node.right, key)
        end
 
        #### 2. Update height of this ancestor node 
        node.height = max(height(node.left), height(node.right)) + 1
 
        #### 3. Get the balance factor of this ancestor node to check whether
        #### this node became unbalanced 
        balance = getBalance(node)
 
        ### If this node becomes unbalanced, then there are 4 cases
        ### Left Left Case
        if balance > 1 && key < node.left.key
            return rightRotate(node)
        end
 
        ### Right Right Case
        if balance < -1 && key > node.right.key
            return leftRotate(node)
        end
 
        ### Left Right Case
        if balance > 1 && key > node.left.key
            node.left = leftRotate(node.left)
            return rightRotate(node)
        end
 
        ### Right Left Case
        if balance < -1 && key < node.right.key
            node.right = rightRotate(node.right)
            return leftRotate(node)
        end
 
        #### return the (unchanged) node pointer 
        return node
    end
 
    ### A utility function to print preorder traversal of the tree.
    ### The function also prints height of every node
    def preOrder(node)
        if node != nil
            print "#{node.key} "
            preOrder(node.left)
            preOrder(node.right)
        end
    end

    ### A utility function to print inOrder traversal of the tree.
    def inOrder(node)
        if node != nil
            inOrder(node.left)
            print "#{node.key} "
            inOrder(node.right)
        end
    end

    ### A utility function to print postOrder traversal of the tree.
    def postOrder(node)
        if node != nil
            postOrder(node.left)
            postOrder(node.right)
            print "#{node.key} "
        end
    end
end

#---------------------------------------------------
tree = AVLTree.new
 
#### Constructing tree given in the above figure 
root = nil
root = tree.insert(root, 10)
root = tree.insert(root, 20)
root = tree.insert(root, 30)
root = tree.insert(root, 40)
root = tree.insert(root, 50)
root = tree.insert(root, 25)

# The constructed AVL Tree would be
#      30
#     /  \
#   20   40
#  /  \     \
# 10  25    50
#

#puts "The preorder traversal of constructed tree is : "
tree.preOrder(root) # 30 20 10 25 40 50 
tree.inOrder(root) # 10 20 25 30 40 50 
tree.postOrder(root) # 10 25 20 50 40 30 

