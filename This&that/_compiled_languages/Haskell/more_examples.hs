



-- ------- function with multiple lines
myFunction = do
    putStrLn "A"
    putStrLn "B"
    putStrLn "C"




-- ------- function with monads as parameter
monadFn1 m1 = do
    -- inside a `do` use `let for variables`
    let fn = (\ x -> if (x == 0) then fail "zero" else Just (x * 10) )
    print $
        m1 >>= fn
      
      
      
        
-- ------- function with monads and lambdas as parameters    
monadFn2 m1 fn = do
    print $
        m1 >>= fn
        





-- ------- lambda
myAnnonymousFunc = (\x -> x * 10)




-- ------- higher order function, function with function as parameter
doCalc fn x = do
    -- to print numbers, use the `show 123` function
    putStrLn $ show $ fn x 



-- ------- main function
main = do
    putStrLn "Hello" -- Hello
    
    myFunction -- A B C
    
    doCalc myAnnonymousFunc 10 -- 100
    
    monadFn1 $ Just 10  -- Just 100
    
    -- inside a `do` use `let for variables`
    let fn = (\ x -> if (x == 0) then fail "zero" else Just (x * 100) )
    monadFn2 (Just 10) (fn) -- Just 1000
    
    -- last line in a `do` needs to be an expression
   
    
    
    
