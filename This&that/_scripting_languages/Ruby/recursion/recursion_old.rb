
#------------------------------------------------------ recursion
def foo(n)

    if n == 10 # base case
        return 10
    else
        # puts n # normal flow
        foo(n + 1) # recursive call with changed parameter
        #puts n # reverse flow
    end
end

foo(1)
