# DSL
class Restaurant
    def self.open_doors(&block)
        foo = Restaurant.new
        foo.instance_eval(&block) # instance_eval is the trick here!
    end

    def take_orders(dish)
        "preparing #{dish}!"
    end

    def play_music(volume)
        "playing #{volume} lounge music!"
    end
end


Restaurant.open_doors do 
    # now we can call instance methods from the Restaurant class!
    take_orders 'sushi'  # 'preparing sushi!'

    play_music('soft') # "playing soft lounge music!"
end
