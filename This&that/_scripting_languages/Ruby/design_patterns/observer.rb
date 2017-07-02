#
# Observer Pattern
#     - The 'Subject' updates the 'Observers'
#

class Subject
    attr_accessor :observers, :val1, :val2, :val3

    def initialize
        @observers = []

        @val1 = nil
        @val2 = nil
        @val3 = nil
    end

    def register(observer)
        puts "--> Adding '#{observer.observer_name}' \n\n"
        @observers << observer
    end

    def unregister(observer)
        puts "--> Removing '#{observer.observer_name}' \n\n"
        @observers -= [observer]
    end

    def notify_observers()
        puts "--> Sending updates..."

        @observers.each do |observer|
            observer.update(@val1, @val2, @val3)
        end

        puts "\n\n"
    end

    #-------

    def set_val1(val1)
        @val1 = val1
        notify_observers
    end

    def set_val2(val2)
        @val2 = val2
        notify_observers
    end

    def set_val3(val3)
        @val3 = val3
        notify_observers
    end

end

#
# The Observers update method is called when the Subject changes
#
class Observer
    attr_accessor :observer_name, :subject, :val1, :val2, :val3

    def initialize(observer_name, subject)
        @observer_name = observer_name
        @subject = subject
        @subject.register(self)

        @val1 = nil
        @val2 = nil
        @val3 = nil
    end

    def update(val1, val2, val3)
        @val1 = val1
        @val2 = val2
        @val3 = val3

        puts "'#{@observer_name}' received: (#{@val1}) (#{@val2}) (#{@val3})"
    end
end


#======= Usage:

# Create the Subject object
# It will handle updating all observers
# as well as deleting and adding them

subject = Subject.new

#
# Create observers that will be sent updates from Subject
#

observer1 = Observer.new('Observer #1', subject)
subject.set_val1('A')
subject.set_val2('B')
subject.set_val3('C')

observer2 = Observer.new('Observer #2', subject)
subject.set_val1('D')
subject.set_val2('E')
subject.set_val3('F')

# Remove one of the observers
subject.unregister(observer2)

subject.set_val1('G')
subject.set_val2('H')
subject.set_val3('I')


#
# Output
#

=begin 

--> Adding 'Observer #1' 

--> Sending updates...
'Observer #1' received: (A) () ()


--> Sending updates...
'Observer #1' received: (A) (B) ()


--> Sending updates...
'Observer #1' received: (A) (B) (C)


--> Adding 'Observer #2' 

--> Sending updates...
'Observer #1' received: (D) (B) (C)
'Observer #2' received: (D) (B) (C)


--> Sending updates...
'Observer #1' received: (D) (E) (C)
'Observer #2' received: (D) (E) (C)


--> Sending updates...
'Observer #1' received: (D) (E) (F)
'Observer #2' received: (D) (E) (F)


--> Removing 'Observer #2' 

--> Sending updates...
'Observer #1' received: (G) (E) (F)


--> Sending updates...
'Observer #1' received: (G) (H) (F)


--> Sending updates...
'Observer #1' received: (G) (H) (I)

=end
