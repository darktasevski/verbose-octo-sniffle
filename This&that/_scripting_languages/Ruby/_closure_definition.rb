# a closure is a 'first class object'
#   - that means it should act like a variable: it can be passed in functions, it can be returned from functions... etc
# a closure is a function that, when defined, grabbed some variables from it's parent scope. (by reference)
# so when the closure is called, in a different scope, it still has access to the 'parent scope of where it was definition'


#------- example (notice that the Person class does not have access to the x and y variables):
x = 'foo'
y = 'bar'
myProc = Proc.new do
  "#{x} #{y}"
end

class Person
  def initialize(myProc)
    p myProc.call
  end
end

Person.new(myProc)  #=> "foo bar"


# that's it!
