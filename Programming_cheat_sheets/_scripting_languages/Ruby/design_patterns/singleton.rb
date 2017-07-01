#
# Singleton Pattern
#     - Uses only one instance of a class
#

class President
    attr_accessor :name

    #create an object of President
    @@instance = President.new

    # Make the constructor private so that this class 
    # cannot be instantiated
    private_class_method :new

    # Get the only object available
    def self.get_instance()
        return @@instance
    end

    def say_hello()
        puts "#{@name}: Good morning America!"
    end
end

#
# We cannot instantiate directly
# president = President.new # Error!
#

# Get the only object available
president = President.get_instance
president.name = 'Trump'
president.say_hello # Trump: Good morning America!

#---

president1 = President.get_instance
president2 = President.get_instance

president1.object_id == president2.object_id # true



