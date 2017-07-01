#
# Factory pattern
#     - The objective is to create an object
#


class ShapeFactory
    def get_shape(shape_type)
        if shape_type == nil
            return nil
        end 

        if shape_type == "circle"
            return Circle.new
        end

        if shape_type == "rectangle"
            return Rectangle.new
        end

        if shape_type == "square"
            return Square.new
        end

        return nil
    end
end

class Rectangle
    def draw
        puts 'Drawing a Rectangle!'
    end
end

class Square 
    def draw
        puts 'Drawing a Square!'
    end
end

class Circle 
    def draw
        puts 'Drawing a Circle!'
    end
end

#======= Usage:

shape_factory = ShapeFactory.new

shape1 = shape_factory.get_shape("circle")
shape1.draw # 'Drawing a Circle!'

shape2 = shape_factory.get_shape("rectangle")
shape2.draw # 'Drawing a Rectangle!'

shape3 = shape_factory.get_shape("square")
shape3.draw # 'Drawing a Square!' 

