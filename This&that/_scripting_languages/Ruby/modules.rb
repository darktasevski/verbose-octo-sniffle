# ruby modules

module Super_power
  def fly
      puts 'flying'
  end 
  
  def lazer
    puts 'lazzzzzer'
  end 
end


class Person
  include Super_power 
end


dude = Person.new

dude.fly # 'flying'

#------------------------

module Foo
  def self.included(base)
    base.extend(ClassMethods)
  end
  
  module ClassMethods
    def bar
      puts 'class method'
    end
  end
  
  def foo
    puts 'instance method'
  end
end

class Baz
  include Foo
end

Baz.bar # class method
Baz.new.foo # instance method
Baz.foo # NoMethodError: undefined method ‘foo’ for Baz:Class
Baz.new.bar # NoMethodError: undefined method ‘bar’ for #<Baz:0x1e3d4>
