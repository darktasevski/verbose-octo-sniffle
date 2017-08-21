# http://www.garethrees.co.uk/2014/01/12/create-a-template-rendering-class-with-erb/

require 'erb'

class MyController
    attr_accessor :template
  def index
    @name = 'Brian'
    @age = 28
  end

  # This is only a helper method to access
  # the object's (private) binding method
  def get_binding
    binding
  end

  def render
    @template = ERB.new(@template)
    @template.result(get_binding)
  end
end

controller = MyController.new
controller.index # execute the code to get variables
controller.template = "Welcome! name: <%= @name %>, age:  <%= @age %>"
controller.render
# => "Welcome! name: Brian, age:  28"

