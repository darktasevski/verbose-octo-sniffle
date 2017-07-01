# https://www.mathsisfun.com/quadratic-equation-solver.html

class QuadraticFormula 
    # ax² + bx + c = 0
    def calculate(a,b,c)
        x1 = ( (b * -1) - Math.sqrt((b * b) - (4 * a * c))  ) / (2 * a)
        x2 = ( (b * -1) + Math.sqrt((b * b) - (4 * a * c))  ) / (2 * a)

        return {
            x1: x1,
            x2: x2
        }
    end
end

q = QuadraticFormula.new
q.calculate(-1.0, -1.0, 2.0)
# { x1: 1.0, x2: -2.0 }
