-- $ ghc -o bar bar.hs; ./bar

import Control.Applicative


-- =====================================================
displayExample x = putStrLn $ show x


-- =====================================================
exampleA = 3 + 3 -- 6

exampleB = (+3) 5 -- 8


-- ===================================================== combining functions
addTen x = x + 10
addFive x = x + 5
addTenAndFive = addTen . addFive
exampleM = addTenAndFive 5 -- 20


-- ===================================================== functors
-- functors: are data types that implement fmap
-- fmap applies a function to a wrapped value
exampleC = fmap (+5) (Just 5) -- Just 10
-- same as:
exampleG = (+5) <$> (Just 5)  -- Just 10


-- function functors: you can combine function
plusSixty = fmap (+30) (+30)
exampleF = plusSixty 10 -- 70


-- ===================================================== applicatives
-- applicatives: is a function that:
-- applies a wrapped function to a wrapped value
exampleD = Just (+20) <*> (Just 20) -- just 40
-- same as:
exampleE = liftA (+20) (Just 20)    -- Just 40   (you need: import Control.Applicative)

-- liftA2 is a function that applies a function to two wrapped values
exampleH = liftA2 (*) (Just 5) (Just 3) -- Just 15


-- ===================================================== monads:
-- monads implement the '>>=' (called 'bind') function, that
-- returns a wrapperd value

-- just a simle function:
half x = if even x
           then Just (x `div` 2)
           else Nothing


exampleI = Just 4 >>= half -- Just 2
exampleJ = Just 3 >>= half -- Nothing
-- you can chain!
exampleK = Just 200 >>= half >>= half >>= half -- Just 25


-- ===================================================== IO monad
displayFileIOExample = getLine >>= readFile >>= putStrLn

-- ===================================================== list monad
half' x = if even x
    then [ (x `div` 2) ]
    else []

plus100 x = [x+100]

exampleL = [10,20,30] >>= half' >>= plus100 -- [105,110,115]

-- =====================================================
main = do
    displayExample exampleA
    displayExample exampleB
    displayExample exampleC
    displayExample exampleD
    displayExample exampleE
    displayExample exampleF
    displayExample exampleG
    displayExample exampleH
    displayExample exampleI
    displayExample exampleJ
    displayExample exampleK
    displayExample exampleL
    displayExample exampleM
    displayFileIOExample -- here you are expected to type in a file name (in the terminal)

