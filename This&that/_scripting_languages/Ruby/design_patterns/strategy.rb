#
# Strategy Patterns
#     - have an object receive another object that encapsulates an algorithm.
#


class Calculation
    attr_accessor :strategy

    def initialize(strategy)
        @strategy = strategy
    end

    def execute(n, m)
        return @strategy.execute(n, m)
    end
end

class Add
    def execute(n, m)
        n + m
    end
end

class Subtract
    def execute(n, m)
        n - m
    end
end


#======= Usage:


calculation = Calculation.new(Add.new)
calculation.execute(10, 5) # 15

calculation = Calculation.new(Subtract.new)
calculation.execute(10, 5) # 5
