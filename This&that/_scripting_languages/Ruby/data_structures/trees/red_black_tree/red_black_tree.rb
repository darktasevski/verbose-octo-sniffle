#!/usr/bin/env ruby

# $ chmod 755 rbt.rb; ./rbt.rb

# http://www.codebytes.in/2014/10/red-black-tree-java-implementation.html

#
# Node class
#
class Node
    attr_accessor :color, :left, :right, :parent, :key
    def initialize(key)
        @color = nil
        @left = nil
        @right = nil
        @parent = nil
        @key = key
    end
end

#
# RedBlackTree Class
#
class RedBlackTree
    RED = 0
    BLACK = 1

    def initialize()
        @nilNode = createNullNode
        @root = @nilNode
    end

    def createNullNode
        node = Node.new(nil)
        node.color = BLACK
        return node
    end

    def createNode(value)
        node = Node.new(value)
        node.color = BLACK
        node.left = @nilNode
        node.right = @nilNode
        node.parent = @nilNode
        return node
    end

    def getRoot()
        return @root
    end

    def print()
        printTree(@root)
    end

    def printTree(node)
        if(node == @nilNode)
            return
        end
        printTree(node.left)
        puts node.color == RED ? "Color: Red Key: #{node.key} Parent: #{node.parent.key}\n" : "Color: Black Key: #{node.key} Parent: #{node.parent.key}\n"
        printTree(node.right)
    end

    def findNode(nodeToFind, node)
        if @root == @nilNode
            return nil
        end

        if nodeToFind.key < node.key
            if node.left != @nilNode
                return findNode(nodeToFind, node.left)
            end
        elsif nodeToFind.key > node.key
            if node.right != @nilNode
                return findNode(nodeToFind, node.right)
            end
        elsif nodeToFind.key == node.key
            return node
        end

        return nil
    end

    def insert(value)
        node = createNode(value)

        temp = @root
        if @root == @nilNode
            @root = node
            node.color = BLACK
            node.parent = @nilNode
        else
            node.color = RED
            while(true)
                if node.key < temp.key
                    if temp.left == @nilNode
                        temp.left = node
                        node.parent = temp
                        break
                    else
                        temp = temp.left
                    end
                elsif node.key >= temp.key
                    if temp.right == @nilNode
                        temp.right = node
                        node.parent = temp
                        break
                    else
                        temp = temp.right
                    end
                end
            end

            fixTree(node)
        end
    end

    #Takes as argument the newly inserted node
    def fixTree(node)
        while (node.parent.color == RED)
            uncle = @nilNode
            if node.parent == node.parent.parent.left
                uncle = node.parent.parent.right

                if uncle != @nilNode && uncle.color == RED
                    node.parent.color = BLACK
                    uncle.color = BLACK
                    node.parent.parent.color = RED
                    node = node.parent.parent
                    next #continue (in JS and Java)
                end

                if node == node.parent.right
                    #Double rotation needed
                    node = node.parent
                    rotateLeft(node)
                end
                node.parent.color = BLACK
                node.parent.parent.color = RED
                #if the "else if" code hasn't executed, this
                #is a case where we only need a single rotation
                rotateRight(node.parent.parent)
            else
                uncle = node.parent.parent.left
                 if uncle != @nilNode && uncle.color == RED
                    node.parent.color = BLACK
                    uncle.color = BLACK
                    node.parent.parent.color = RED
                    node = node.parent.parent
                    next #continue (in JS and Java)
                end
                if node == node.parent.left
                    #Double rotation needed
                    node = node.parent
                    rotateRight(node)
                end
                node.parent.color = BLACK
                node.parent.parent.color = RED
                #if the "else if" code hasn't executed, this
                #is a case where we only need a single rotation
                rotateLeft(node.parent.parent)
            end
        end
        @root.color = BLACK
    end

    def rotateLeft(node)
        if node.parent != @nilNode
            if node == node.parent.left
                node.parent.left = node.right
            else
                node.parent.right = node.right
            end
            node.right.parent = node.parent
            node.parent = node.right
            if node.right.left != @nilNode
                node.right.left.parent = node
            end
            node.right = node.right.left
            node.parent.left = node
        else # Need to rotate @root
            right = @root.right
            @root.right = right.left
            right.left.parent = @root
            @root.parent = right
            right.left = @root
            right.parent = @nilNode
            @root = right
        end
    end

    def rotateRight(node)
        if node.parent != @nilNode
            if node == node.parent.left
                node.parent.left = node.left
            else
                node.parent.right = node.left
            end

            node.left.parent = node.parent
            node.parent = node.left
            if node.left.right != @nilNode
                node.left.right.parent = node
            end
            node.left = node.left.right
            node.parent.right = node
        else # Need to rotate @root
            left = @root.left
            @root.left = @root.left.right
            left.right.parent = @root
            @root.parent = left
            left.right = @root
            left.parent = @nilNode
            @root = left
        end
    end

    #Deletes whole tree
    def _deleteTree()
        @root = @nilNode
    end

    #Deletion Code .

    #This operation doesn't care about the new Node's connections
    #with previous node's left and right. The caller has to take care
    #of that.
    def transplant(target, _with)
        if target.parent == @nilNode
            @root = _with
        elsif target == target.parent.left
            target.parent.left = _with
        else
            target.parent.right = _with
        end   # <----------------------------- not sure about this section of the code...

        _with.parent = target.parent
    end

    def _delete(value)

        z = createNode(value)


        if (z = findNode(z, @root)) == nil
            return false
        end

        # x = nil
        y = z # temporary reference y
        y_original_color = y.color

        if z.left == @nilNode
            x = z.right
            transplant(z, z.right)
        elsif z.right == @nilNode
            x = z.left
            transplant(z, z.left)
        else
            y = treeMinimum(z.right)
            y_original_color = y.color
            x = y.right
            if(y.parent == z)
                x.parent = y
            else
                transplant(y, y.right)
                y.right = z.right
                y.right.parent = y
            end
            transplant(z, y)
            y.left = z.left
            y.left.parent = y
            y.color = z.color
        end
        if y_original_color == BLACK
            _deleteFixup(x)  # <--------------- not sure about this section of the code
        end
        return true
    end

    def _deleteFixup(x)
        while (x != @root && x.color == BLACK)
            if x == x.parent.left
                w = x.parent.right
                if w.color == RED
                    w.color = BLACK
                    x.parent.color = RED
                    rotateLeft(x.parent)
                    w = x.parent.right
                end
                if w.left.color == BLACK && w.right.color == BLACK
                    w.color = RED
                    x = x.parent
                    next #continue (in JS and Java)

                elsif w.right.color == BLACK  # <---------------- not sure about this section of the code
                    w.left.color = BLACK
                    w.color = RED
                    rotateRight(w)
                    w = x.parent.right
                end
                if w.right.color == RED
                    w.color = x.parent.color
                    x.parent.color = BLACK
                    w.right.color = BLACK
                    rotateLeft(x.parent)
                    x = @root
                end
            else
                w = x.parent.left
                if w.color == RED
                    w.color = BLACK
                    x.parent.color = RED
                    rotateRight(x.parent)
                    w = x.parent.left
                end
                if w.right.color == BLACK && w.left.color == BLACK
                    w.color = RED
                    x = x.parent
                    next #continue (in JS and Java)

                elsif w.left.color == BLACK
                    w.right.color = BLACK
                    w.color = RED
                    rotateLeft(w)
                    w = x.parent.left
                end
                if w.left.color == RED
                    w.color = x.parent.color
                    x.parent.color = BLACK
                    w.left.color = BLACK
                    rotateRight(x.parent)
                    x = @root
                end
            end
        end
        x.color = BLACK
    end

    def treeMinimum(subTreeRoot)
        while (subTreeRoot.left != @nilNode)
            subTreeRoot = subTreeRoot.left
        end
        return subTreeRoot
    end
end

#------- usage
rbt = RedBlackTree.new()

rbt.insert(7)
rbt.insert(5)
rbt.insert(6)
rbt.insert(10)
rbt.insert(9)
rbt.insert(2)
rbt.insert(3)
rbt.insert(1)
rbt.insert(8)
rbt.insert(4)
rbt.print() # (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)


=begin OUTPUT:
Color: Black Key: 1 Parent: 2
Color: Black Key: 2 Parent: 4
Color: Black Key: 3 Parent: 2
Color: Black Key: 4 Parent: -1
Color: Black Key: 5 Parent: 6
Color: Black Key: 6 Parent: 4
Color: Black Key: 7 Parent: 8
Color: Red Key: 8 Parent: 6
Color: Black Key: 9 Parent: 8
Color: Red Key: 10 Parent: 9
=end


rbt._delete(1) # true
rbt._delete(10) # true
rbt.print() # (2, 3, 4, 5, 6, 7, 8, 9)


=begin OUTPUT:
Color: Black Key: 2 Parent: 3
Color: Red Key: 3 Parent: 6
Color: Red Key: 4 Parent: 5
Color: Black Key: 5 Parent: 3
Color: Black Key: 6 Parent: -1
Color: Black Key: 7 Parent: 8
Color: Red Key: 8 Parent: 6
Color: Black Key: 9 Parent: 8
=end
