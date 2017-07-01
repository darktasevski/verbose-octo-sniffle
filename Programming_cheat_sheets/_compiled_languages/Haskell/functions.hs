
-- ==================================================================== functions
-- the function declaration below is saying: 'this functions takes an int and returns an int' (the return is the last data type)
addTwo :: Int -> Int -- declaration is optional

addTwo x = x + 2

-- there should have a main function, called main!
main = do
    print (addTwo 3) -- 5

-- ==================================================================== combining functions
addTwo :: Int -> Int
addTwo x = x + 2

crazyCalculation :: Int -> Int -> Int
crazyCalculation x y = addTwo x + addTwo y

main = do
    print (crazyCalculation 3 3) -- 10
    
-- ==================================================================== 
