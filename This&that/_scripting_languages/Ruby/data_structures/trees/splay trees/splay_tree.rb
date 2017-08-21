# http://www.geeksforgeeks.org/splay-tree-set-1-insert/

# The code is adopted from http:#goo.gl/SDH9hH
#include<stdio.h>
#include<stdlib.h>

# An AVL tree node
class Node
    attr_accessor :key, :left, :right
end

# Helper function that allocates a new node with the given key and
#    nil left and right pointers. */
def newNode(key)
    node = Node.new
    node.key   = key
    node.left  = node.right  = nil
    return node
end

# A utility function to right rotate subtree rooted with y
# See the diagram given above.
def rightRotate(x)
    y = x.left
    x.left = y.right
    y.right = x
    return y
end

# A utility function to left rotate subtree rooted with x
# See the diagram given above.
def leftRotate(x)
    y = x.right
    x.right = y.left
    y.left = x
    return y
end

# This function brings the key at root if key is present in tree.
# If key is not present, then it brings the last accessed item at
# root.  This function modifies the tree and returns the new root
def splay(root, key)
    # Base cases: root is nil or key is present at root
    if root == nil || root.key == key
        return root
    end
    # Key lies in left subtree
    if root.key > key
        # Key is not in tree, we are done
        return root if root.left == nil

        # Zig-Zig (Left Left)
        if root.left.key > key
            # First recursively bring the key as root of left-left
            root.left.left = splay(root.left.left, key)

            # Do first rotation for root, second rotation is done after else
            root = rightRotate(root)
            elsif root.left.key < key # Zig-Zag (Left Right)
            # First recursively bring the key as root of left-right
            root.left.right = splay(root.left.right, key)

            # Do first rotation for root.left
            if root.left.right != nil
                root.left = leftRotate(root.left)
            end
        end

        # Do second rotation for root
        return (root.left == nil) ? root : rightRotate(root)
        # end
        else # Key lies in right subtree
        # Key is not in tree, we are done
        return root if (root.right == nil)

        # Zag-Zig (Right Left)
        if root.right.key > key
            # Bring the key as root of right-left
            root.right.left = splay(root.right.left, key)

            # Do first rotation for root.right
            if root.right.left != nil
                root.right = rightRotate(root.right)
            end
            elsif root.right.key < key # Zag-Zag (Right Right)
            # Bring the key as root of right-right and do first rotation
            root.right.right = splay(root.right.right, key)
            root = leftRotate(root)
        end

        # Do second rotation for root
        return (root.right == nil) ? root : leftRotate(root)
    end
end

# The search function for Splay tree.  Note that this function
# returns the new root of Splay Tree.  If key is present in tree
# then, it is moved to root.
def search(root, key)
    return splay(root, key)
end

# A utility function to print preorder traversal of the tree.
# The function also prints height of every node
def preOrder(root)
    if root != nil
        print "#{root.key} "
        preOrder(root.left)
        preOrder(root.right)
    end
end

# Drier program to test above function*/
def main()
    root = newNode(100)
    root.left = newNode(50)
    root.right = newNode(200)
    root.left.left = newNode(40)
    root.left.left.left = newNode(30)
    root.left.left.left.left = newNode(20)

    root = search(root, 20)
    print("Preorder traversal of the modified Splay tree is \n")
    preOrder(root)
    return 0
end


main
