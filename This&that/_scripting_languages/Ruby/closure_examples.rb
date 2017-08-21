# closures are first class functions that can access the parent scope of where they were defined (access is not dynamic)
# even though that scope is not in scope anymore
class Person
    attr_accessor :name

    def createClosure
        Proc.new do |newName|
            @name = newName
        end
    end
end

brian = Person.new
brian.name = 'brian spinos' # in the instance scope

closure = brian.createClosure # in the instance scope

# now we are not in the instance scope!
closure.call('erich')  # access variables in another scope

# proof that the closure did access another scope,
# and that it is in fact a closure:
brian.name # "erich"

#=============== the code bellow are just examples of blocks, procs, and lambdas, they are not necessarily closures... :(












# block, proc and lambda (its like a handler function in javascript!)

# a block is code surrounded by the 'do' and 'end' key word, or curly braces '{ ... }'
# a proc and lambda is an object that encapsulates a block, so you can save a block to a variable!
# you can only have 1 block per function
# you can have multiple procs passed to a function

#------------------------------ an example of a block
some_function do |x| # is is some variable that is already defined in this functions declaration
    puts x + 10
end

#------------------------------ an example of a proc
my_proc = Proc.new do |x|
    puts x + 100
end

my_proc.call(1) # 101

#------------------------------ an example of a lambda
my_lambda = lambda do |x|
    puts x + 100
end

my_lambda.call(1) # 101

#------------------------------ an example of a staby lambda
my_stabby_lambda = -> (x) do
    puts x + 100
end

my_stabby_lambda.call(1) # 101

#------------------------------ function declaration that uses a block as a parameter
def function_that_receives_a_block(&my_block)
    foo = 2
    my_block.call(foo) # you can pass parameters to the block if you want
end

#------------------------------ function called with a block argument
function_that_receives_a_block do |f| # f represents 'foo' was already defined in the function definition
    puts f * 5 # I can access f (that represents 'foo' in the function declaration)
end

# returns => 10

#------------------------------ function that uses multiple procs as parameters
def function_that_uses_multiple_procs(process_a, process_b)
    foo = 5
    bar = 10
    process_a.call(foo)
    process_b.call(bar)
end

proc_a = Proc.new do |n|
    puts n * 10
end

proc_b = Proc.new do |n|
    puts n * 2
end

function_that_uses_multiple_procs(proc_a, proc_b) # returns 50 and 20

#------------------------------ blocks with `yield`
def make_sandwich(bread_type)
    meat = 'beef'

    puts bread_type
    yield meat
    puts bread_type
end

make_sandwich('flat bread') do |m| # there can be only 1 block in a function
    puts "#{m} - well done!"
end

#------------------------------ blocks with `&`
def make_sandwich(bread_type, &handler) # there can be only 1 block in a function
    meat = 'beef'

    puts bread_type
    handler.call(meat)
    puts bread_type
end

make_sandwich('flat bread') do |m| # there can be only 1 block in a function
    puts "#{m} - well done!"
end

#------------------------------ proc
def make_sandwich(bread_type, handler)
    meat = 'beef'

    puts bread_type
    handler.call(meat)
    puts bread_type
end

handler = Proc.new do |m|
    puts "#{m} - well done!"
end

make_sandwich('flat bread', handler) 

#------------------------------ lambda
def make_sandwich(bread_type, handler)
    meat = 'beef'

    puts bread_type
    handler.call(meat)
    puts bread_type
end

handler = lambda do |m|
    puts "#{m} - well done!"
end

make_sandwich('flat bread', handler) 

#------------------------------ stabby lambda (Ruby 1.9)
def make_sandwich(bread_type, handler)
    meat = 'beef'

    puts bread_type
    handler.call(meat)
    puts bread_type
end

handler = -> (m){
    puts "#{m} - well done!"
}

make_sandwich('flat bread', handler) 

#------------------------------ differences between proc and lambda:
# 1. they treat the `return` keyword differently:
#        - procs exit the function
#        - lambdas give control back to the function
# 2. lambdas check the number of arguments, procs do not.
