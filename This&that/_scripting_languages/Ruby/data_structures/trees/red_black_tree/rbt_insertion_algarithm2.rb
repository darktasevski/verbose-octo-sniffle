# RB tree

# http://www.geeksforgeeks.org/red-black-tree-set-2-insert/

def insert(currentRoot, k, v)
    
    #...

    if currentRoot.parent.color == :red
        if currentRoot.uncle.color == :black
            if case1(currentRoot) # right right child
                leftRotate(currentRoot.grandParent)
                currentRoot.parent.color = :black
                currentRoot.grandParent.color = :red
            end

            if case2(currentRoot) # right left child
                makeCase1(currentRoot)
            end

            if case3(currentRoot) # left left child
                rightRotate(currentRoot.grandParent)
                currentRoot.parent.color = :black
                currentRoot.grandParent.color = :red
            end

            if case4(currentRoot) # left right child
                makeCase3(currentRoot)
            end
        else
            # currentRoot.uncle.color == :red

            # recoloring
            currentRoot.parent.color = :black
            currentRoot.uncle.color = :black
            currentRoot.grandParent.color = :red
            currentRoot = currentRoot.grandParent; # recurse
        end
    else
        # no alteration needed
    end
end
