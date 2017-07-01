-- http://learnyouahaskell.com/making-our-own-types-and-typeclasses (close to the middle of the page)

data Tree a = 
    EmptyTree | Node a (Tree a) (Tree a) 
    deriving (Show, Read, Eq)  

singleton :: a -> Tree a  
singleton x = Node x EmptyTree EmptyTree  
  
treeInsert :: (Ord a) => a -> Tree a -> Tree a  
treeInsert x EmptyTree = singleton x  
treeInsert x (Node a left right)   
    | x == a = Node x left right  
    | x < a  = Node a (treeInsert x left) right  
    | x > a  = Node a left (treeInsert x right)  
    
treeElem :: (Ord a) => a -> Tree a -> Bool  
treeElem x EmptyTree = False  
treeElem x (Node a left right)  
    | x == a = True  
    | x < a  = treeElem x left  
    | x > a  = treeElem x right  

nums = [1, 2]  
numsTree = foldr treeInsert EmptyTree nums  

main = do
    print "hello world"
    print(numsTree)
