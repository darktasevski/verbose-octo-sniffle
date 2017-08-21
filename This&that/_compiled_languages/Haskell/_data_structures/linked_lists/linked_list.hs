-- LinkedList in Haskell

-- functions need to start with lower-case
-- dont use tabs
-- be carefull with indentation


data Node value = EmptyNode | Node value (Node value) deriving (Show, Read, Eq)  -- Node value next


createNode :: value -> Node value  -- pass a value and returns a Node
createNode x = Node x EmptyNode  -- node creation! 
  
nodeInsert :: (Ord foo) => foo -> Node foo -> Node foo  -- pass a value and a Node, and return a node  -- (Ord a) => means:  hey, 'value' can be ordered!
nodeInsert x EmptyNode = createNode x  -- if you pass a value and an 'empty Node' -> call createNode function with the value
nodeInsert x (Node a nextNode)   -- if you pass a x and a Node, do the following: -- here you have access to the object's fields! ('a' and 'nextNode')
    | nextNode == EmptyNode = Node x (nodeInsert a nextNode)    -- if  nextNode == EmptyNode, then return Node with value, and recurse on the nextNode
    | otherwise = Node x (nodeInsert a nextNode)  -- in Haskell we NEED an 'otherwise', else it will throw an Error... in this block, just do the same as above!   
    
isValueInList :: (Ord foo) => foo -> Node foo -> Bool  -- pass in a value and a Node
isValueInList value EmptyNode = False            -- if you pass a value and an empty node, return False
isValueInList value (Node a nextNode)          -- if you pass in a value and a node, do the following: -- here you have access to the object's fields! ('a' and 'nextNode')
    | value == a = True                           -- if value == a, return true
    | otherwise = isValueInList value nextNode    -- otherwise, keep looking in the next node recursively.
    


main = do
    let nums = [1,2,3,4,5,6,7,8,9]  
    let numsNode = foldr nodeInsert EmptyNode nums  
    print numsNode -- Node 1 (Node 2 (Node 3 (Node 4 (Node 5 (Node 6 (Node 7 (Node 8 (Node 9 EmptyNode))))))))

    print(isValueInList 2 numsNode) -- True
