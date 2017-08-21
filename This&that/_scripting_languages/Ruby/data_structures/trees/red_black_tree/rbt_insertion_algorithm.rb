def fixTree(node)
    while (P == RED)
        U = @nilNode
        if P == G.left 
            U = G.right

            #
            # if P is a left child, U is a right child (and node is red)
            # 

            if U != @nilNode && U == RED
                P = BLACK
                U = BLACK
                G = RED
                node = G
                next #continue (in JS and Java)
            end

            # continue working with node = G

            if node == P.right # if node is right child
                #Double rotation needed
                node = P
                rotateLeft(node)
            end
            P = BLACK
            G = RED
            #if the "else if (the if statement above?)" code hasn't executed, this
            #is a case where we only need a single rotation
            rotateRight(G)
        else  

            U = G.left

            #
            # if P is a right child, U is a left child (and node is red)
            # 

            if U != @nilNode && U == RED
                P = BLACK
                U = BLACK
                G = RED
                node = G
                next #continue (in JS and Java)
            end

            # continue working with node = G

            if node == P.left
                #Double rotation needed
                node = P
                rotateRight(node)
            end
            P = BLACK
            G = RED
            #if the "else if (the if statement above?)" code hasn't executed, this
            #is a case where we only need a single rotation
            rotateLeft(G)
        end
    end
    @root = BLACK
end
