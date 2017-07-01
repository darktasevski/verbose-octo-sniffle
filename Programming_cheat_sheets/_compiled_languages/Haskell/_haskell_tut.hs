-- haskell tutorial

-- links
-- https://learnxinyminutes.com/docs/haskell/
-- http://learnyouahaskell.com/making-our-own-types-and-typeclasses ???

-- ==================================================================== Gotchas:
-- indentation is important
-- in Haskell, the `=` sign is like a `return` in other languages
-- the `::` is usially for declarations
-- using functions as arguments, the functions is in the parenthesis! :  foo :: (Int -> Int) -> Int
-- `show` is for displaying as a string
-- `instance` is where we define the behaviour of type classes for our custom data types


-- ==================================================================== Curried functions:
-- As you know, functions in Haskell are curried by default, which means that a function that seems 
-- to take several parameters actually takes just one parameter and returns a function that takes the next 
-- parameter and so on.

-- ====================================================================Types:
-- (you can create custom types)
-- Int, Integer, Float, Double, Bool, Char

-- ==================================================================== Typeclasses  (Haskell's interfaces):
-- (A typeclass is a sort of interface that defines some behavior.)
-- (you can create custom typeclasses)
-- Eq, Ord, Show, Read, Enum, Bounded, Num, Integral, Floating
-- Functor, Applicatiive, Monads, Monoids

-- declaration of a typeclass:
class YesNo a where  
    yesno :: a -> Bool 
    
-- an implementation:
instance YesNo Int where  
    yesno 0 = False  
    yesno _ = True 

-- the actual declaration of the 'functor' typeclass
class Functor f where  
    fmap :: (a -> b) -> f a -> f b 

-- ==================================================================== print statement
main = putStrLn "Hello World"

-- ==================================================================== multiple print statements
main = do
    putStrLn "Hello World1"
    putStrLn "Hello World2"
    putStrLn "Hello World3"

-- ==================================================================== variables (actualy constants)
myMessage :: String -- declaration not necessary
myMessage = "Hello World"
main = putStrLn myMessage -- Hello World

-- ==================================================================== functions
addMe :: Int -> Int -> Int -- declaration not necessary
addMe x y = x + y -- you can use any letters
result1 = print(addMe 1 3)
result2 = print(1 `addMe` 3) -- this also works

main = do
    result1 -- 4
    result2 -- 4
    print(addMe 1 3) -- 4
    print(1 `addMe` 3) -- 4
    
-- ==================================================================== function with parenthesis
foo x y z = x + y + z

main = do
    print(foo 5 (foo 5 5 5) 5) -- 25
-- ==================================================================== If statements
isOdd :: Int -> Bool
isOdd n
    | n `mod` 2 == 0 = False -- "if n % 2 == 0 return false"
    | otherwise = True -- "else return true"

main = do
    print(isOdd 2)
    
-- ==================================================================== functions as parameters

multiplyBy2 :: Int -> Int
multiplyBy2 x = x * 2

-- double10 is a function that takes:
-- (function that takes an Int and returns an Int ) and returns an Int
double10 :: (Int -> Int) -> Int 

-- function implementation:
double10 func = func 10 -- the '=' sign means: 'return' in haskell 

main = do
    print(double10 multiplyBy2)
    
-- ==================================================================== anonymous functions (lambdas)
-- double the elements in the array, and return a new array
-- '(\x -> x * 2)' is an anonymous functions that takes x as an argument and multiplies it by 2.
foo = map (\x -> x * 2) [1..10]

main = do
    print(foo) -- [2,4,6,8,10,12,14,16,18,20]

-- ====================================================================  custom data types
data Person = Person { 
    name :: String,
    address :: String,
    age :: Int
} deriving (Eq, Show)

-- ------- a function that operates on a structure
getAge :: Person -> Int
getAge (Person _ _ theAgeField) = theAgeField

-- ------- instatiation
brian = Person {name = "Brian Spinos", address = "123 Foo St", age = 27}
ana = Person {name = "Ana Claudia", address = "123 Foo St", age = 22}

-- ------- assigning a value to a variable (constant)
brianAge = print(getAge brian)

-- ------- the main function
main = do
    print(brian)  -- Person {name = "Brian Spinos", address = "123 Foo St", age = 27}
    brianAge -- 27

-- ====================================================================  Enums ?
data Color = Red | Blue | Green

-- a function called 'say' which takes as a parameter a 'Color' and returns a string
say :: Color -> String

say Red = "You are Red!"
say Blue = "You are Blue!"
say Green =  "You are Green!"

main = print(say Red) -- "You are Red!"

-- ==================================================================== 
sumOfValues = sum [1..3]
myNegativeNumber = (-10)  -- needs parenthesis
myBoolean = not(True)
listOfNumbers = [3, 5, 7, 11]
listOfNames = ["brian", "ana", "rick", "sandra"]

-- Get the number in index 2
thirdNumber = listOfNumbers !! 1

-- Get the name in index 0
firstName = listOfNames !! 0

main = do
    print sumOfValues -- 6
    print myNegativeNumber -- -10
    print myBoolean -- False
    print thirdNumber -- 7
    print firstName -- "brian"

-- ==================================================================== importing libraries 
import Data.List -- importing libraries
import System.IO

main = putStrLn "Hello World"

-- ==================================================================== 

-- ====================================================================  
    
-- (kind of an if statement for the arguments)    
foo :: Int -> String
foo 1 = "you chose one!" ++ show 123 ++ show 345 ++ "hello"
foo 2 = "you chose two!" 
foo 3 = "you chose three!" 
foo x = "you chose another number!"


-- guards (like if statements)
myGuardExample :: Int -> String
myGuardExample x
    | x == 1 = "you chose one!"
    | x == 2 = "you chose two!"
    | x == 3 = "you chose three!"
    | otherwise = "you chose another number!"


-- concatenation of strings and numbers
myConcat :: String
myConcat = "hello " ++ show 123 ++ " there!"


-- annonymous function
myLambda = map (\x -> x * 10) [1..3] -- [10, 20, 30] 


-- case statement
myCaseStatement :: Int -> String
myCaseStatement x = case x of
    1 -> "you picked 1"
    2 -> "you picked 2"
    3 -> "you picked 3"
    _ -> "you picked another number"

-- ====================================================================  functions as parameters

myMult :: Int -> Int -> Int
myMult x y = x * y


foo :: (Int -> Int -> Int) -> Int -> Int
foo fn x = fn x 10

main =  do
    print(foo myMult 4) -- 40
    
-- ====================================================================  

data Car = Car String deriving (Show, Eq)
data Person = Person String Int Car | NoPerson deriving (Show, Eq)

foo :: Person -> String
foo (Person x y (Car z) )
    | y == 1 = "y is one"
    | z == "toyota" = "has toyota"
    | otherwise = "other..."
foo NoPerson = "no person here"

main = do
    print(foo(Person "brian" 10 (Car "toyota")))
    print $ foo $ NoPerson
    
-- ====================================================================  

-- simple monad example
-- monads are like burritos, they are a wrapper to a value
-- here "Just" is a monad that wraps the value 10.
-- so you pass in a function that should return another monad.
-- pseudo code:   Monad 10 >>= function_that_returns_another_monad 
main =
    print $ Just 10 >>= (\ x -> if (x == 0) then fail "zero" else Just (x * 10) )
    -- returns:  Just 100
    

-- ====================================================================  functors
-- http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html

-- A Functor is any data type that defines how fmap applies to it.

-- <$> is the infix version of fmap, so you will often see this instead: getPostTitle <$> (findPost 1)



-- what happens when you apply a function to another function?
-- > import Control.Applicative
-- > let foo = fmap (+3) (+2) --   let foo = (+3) <$> (+2)
-- > foo 10
-- 15
-- So functions are Functors too!
-- When you use fmap on a function, you're just doing function composition! (combining functions)

-- ====================================================================  Applicatives

Just (+3) <*> Just 2 == Just 5
-- the functions are also wrapped in a context (Just)

-- ====================================================================  

-- A functor is a data type that implements the Functor typeclass.
-- An applicative is a data type that implements the Applicative typeclass.
-- A monad is a data type that implements the Monad typeclass.
-- A Maybe implements all three, so it is a functor, an applicative, and a monad.

-- functors: you apply a function to a wrapped value using fmap or <$>
-- applicatives: you apply a wrapped function to a wrapped value using <*> or liftA
-- monads: you apply a function that returns a wrapped value, to a wrapped value using >>= or liftM

-- ====================================================================  

