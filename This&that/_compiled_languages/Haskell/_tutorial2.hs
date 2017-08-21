-- ==================================================================== how to compile
-- $ ghci
-- :quit

-- :r -- ???

-- :l foo.hs -- compile a file in the console

-- $ ghc -o foo foo.hs
-- ./foo


-- import Data.List
-- import System.IO
import Control.Applicative
import Control.Monad

-- ====================================================================

data Person = Person { name :: String,
                       age :: Int,
                       address :: String
                     } deriving (Eq, Show)


brian = Person { name = "Brian Spinos",
                 address = "4593 E burrito Rd",
                 age = 27}

dataExample = putStrLn $ show $ address brian

-- ====================================================================
data FooBar = A | B | C

instance Eq FooBar where
    A == A = True
    B == B = True
    C == C = True
    _ == _ = False


instance Show FooBar where
    show A = "Letter A"
    show B = "Letter B"
    show C = "Letter C"

-- ====================================================================

exampleB = putStrLn $ show $ fmap (++"!") (Just "hello") -- Just "hello!"
exampleC = putStrLn $ show $ (*) <$> Just 2 <*> Just 8 -- Just 16


-- ==================================================================== monads
-- monads: you apply a function that returns a wrapped value, to a wrapped value using >>= or liftM


-- simple monad example
-- monads are like burritos, they are a wrapper to a value
-- here "Just" is a monad that wraps the value 10.
-- so you pass in a function that should return another monad.
-- pseudo code:   Monad 10 >>= function_that_returns_another_monad


monadExampleA =
    putStrLn $ show $
    Just 10 >>= (\ x -> if (x == 0) then fail "zero" else Just (x * 10) ) -- Just 100

    -- same as:
    -- liftM (\ x -> if (x == 0) then fail "zero" else Just (x * 10) ) (Just 10) -- needs: import Control.Monad

-- ====================================================================  data functors
-- http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html

-- functor is any data the implements fmap

functorExampleZ =
    putStrLn $ show $
    fmap (*10) (Just 123) -- Just 1230

    -- same as:
    -- (*10) <$> (Just 123) -- Just 1230

-- ====================================================================  function functors
-- When you use fmap on a function, you're just doing function composition! (combining functions)
-- import Control.Applicative

functorExampleA = do
    let plusThreeAndPlusTwo = fmap (+3) (+2)

    -- same as:
    -- let plusThreeAndPlusTwo = (+3) <$> (+2)

    putStrLn $ show $
        plusThreeAndPlusTwo 10 -- 15

-- ====================================================================  Applicatives
-- applicatives: you apply a wrapped function to a wrapped value using <*> or liftA

applicativeExampleA = do
    let plusThreeAndTwo = Just (+3) <*> Just 2

    -- same as:
    -- let plusThreeAndTwo = liftA (+3) (Just 2)

    putStrLn $ show $
        plusThreeAndTwo -- Just 5

-- ====================================================================

showExample x = putStrLn $ show x

main = do
    putStrLn ""
    putStrLn $ show A
    putStrLn $ show B
    putStrLn $ show C

    putStrLn ""
    putStrLn $ show $ A == B
    putStrLn $ show $ A == A

    putStrLn ""
    exampleB
    exampleC

    putStrLn "\nMonad:"
    monadExampleA

    putStrLn "\nFunctor:"
    functorExampleA
    functorExampleZ

    putStrLn "\nApplicative:"
    applicativeExampleA

    putStrLn "\ndata:"
    dataExample
    showExample  $ Just (+3) <*> Just 2



