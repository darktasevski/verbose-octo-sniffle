class Human
    attr_accessor :name, :age

    def initialize(name)
        @name = name
    end
    
    def work
        puts 'Human working...'
    end
    
    def foo 
        puts "Human foo"
    end
end

class Person < Human
    attr_accessor :name, :age

    def initialize(name)
        @name = name
    end
    
    def work
        puts 'Person working...'
        super # call `work` function in the parent class
    end
    
    def bar 
        puts "Person bar"
    end
end

brian = Person.new("Brian")
brian.work # Person working... Human working...
brian.foo # Human foo
brian.bar # Person bar
