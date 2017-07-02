-- Haskell binary tree

-- functions need to start with lower-case
-- dont use tabs
-- be carefull with indentation

data Tree a = EmptyNode | Node a (Tree a) (Tree a) deriving (Show, Read, Eq)  


createNode :: foo -> Tree foo  -- pass a value and returns a tree with that value
createNode value = Node value EmptyNode EmptyNode  -- node creation! 
  
treeInsert :: (Ord foo) => foo -> Tree foo -> Tree foo  -- pass a value and a tree, and it returns a tree
treeInsert value EmptyNode = createNode value  -- if you pass a value and an EmptyNode, then call createNode function
treeInsert value (Node a left right)   -- if you pass a value and a Node, do the following: -- here you have access to the object's fields! ('a', 'left', 'right')
    | value == a = Node value left right    -- if the value == the value of the Node passed in, then return a Node as root?
    | value < a  = Node a (treeInsert value left) right  -- if value is less:  return the root, but recurse on the root's left value
    | value > a  = Node a left (treeInsert value right)  -- if value is greater:  return the root, but recurse on the root's right value
    
isValInTree :: (Ord foo) => foo -> Tree foo -> Bool  -- pass in a value and a tree, returns a boolean
isValInTree value EmptyNode = False            -- if you pass a value and an EmptyNode, return False
isValInTree value (Node a left right)          -- if you pass in a value and a Node, do the following: -- here you have access to the object's fields! ('a', 'left', 'right')
    | value == a = True                           -- if value == value of the root, return true
    | value < a  = isValInTree value left            -- if value < root value, recurse with left Node
    | value > a  = isValInTree value right           -- if value > root value, recurse with right Node
    


main = do
    let nums = [8,6,4,1,7,3,5]  
    let numsTree = foldr treeInsert EmptyNode nums  
    print numsTree -- Node 5 (Node 3 (Node 1 EmptyNode EmptyNode) (Node 4 EmptyNode EmptyNode)) (Node 7 (Node 6 EmptyNode EmptyNode) (Node 8 EmptyNode EmptyNode))

    print(isValInTree 4 numsTree) -- True
