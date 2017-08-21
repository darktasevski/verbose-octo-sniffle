#
# Visitor Patterns
#     - have and object1 that accept object2, object2 will change the sate of object1
#


#
# Class that will be visited
#
class Car 
    attr_accessor :gear

    def initialize
        @gear = nil
    end

    #
    # The visitor will enter this object and make changes to it.
    #
    def accept(visitor)
        visitor.visit(self)
    end

    def change_gear(gear)
        @gear = gear
    end
end

#
# Visitor
#
class Person 
    attr_accessor :name

    def initialize(name)
        @name = name
    end

    def visit(car)
        puts "#{@name} is changing gears in the car"
        car.change_gear(1)
    end
end

car = Car.new
brian = Person.new('Brian')
car.accept(brian) # Brian is changing gears in the car
